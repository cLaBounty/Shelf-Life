import flask
from flask import request, jsonify
import json
from ingredient_matcher import findCommonNameFromOfficial
import requests
import mysql.connector
import database_connector as dbConnector
import urllib.parse
import random

# ref: https://programminghistorian.org/en/lessons/creating-apis-with-python-and-flask
app = flask.Flask(__name__)
app.config["DEBUG"] = True
app.url_map.strict_slashes = False
@app.route('/', methods=['GET'])
def home():
    return "<h1> hello </h1>"


@app.route('/api/barcode/', methods=['GET'])
def barcode():
    """
        Handles getting the official name from the barcode API

        INPUT:
        Expects the barcode in the url as an argument, i.e 
        /api/barcode/?barcode=NNN

        
        OUTPUT:
        {
            "Status": "OK"                        
            "Official Name": "Rossco Thin Spaghetti"
        }

    Sample Curl:
    curl http://127.0.0.1:5000/api/barcode/?barcode=737628064502
    """
    params = request.args
    api_response_json = None
    response_dict = {}
    response_dict["Status"] = "ERROR"
    try: # catch spaghetti o's error 
        if 'barcode' in params:
            barcode = params['barcode']

            api_response = requests.get(
                'https://world.openfoodfacts.org/api/v0/product/{0}.json'.format(barcode))
            api_response_json = api_response.json()
            
            if api_response_json['status_verbose'] == 'product found':
                response_dict['Status'] = "OK"            
                response_dict["Official Name"] = api_response_json["product"]["product_name_en"]
                return response_dict       
            else:
                response_dict['Status'] = "NOT_FOUND"   
                return response_dict         
    except:
        response_dict['Status'] = "NOT_FOUND"
    return response_dict

@app.route('/api/selection/', methods=['POST'])
def selection():
    """
        Handles converting the selected parts of a scanned item official name into their common ingredient names.

        INPUT:
        Expects a JSON object in the request data that is in this format:
        {
            "Selection": [
                "Spaghetti",                
            ],
            "Official Name": "Rossco Thin Spaghetti"
        }

        
        OUTPUT:
        {            
            "Category": "Long Noodles",
            "Common Name": "spaghetti",
            "Official Name": "Rossco Thin Spaghetti"
        }


        Sample curl tester:
        curl -d '{"Selection": ["spaghetti"], "Official Name": "Rossco Thin Spaghetti"}' -H "Content-Type: application/json" -X POST http://127.0.0.1:5000/api/selection/
    """
    info_dict = request.json

    user_selection = info_dict["Selection"]
    response_dict = {}
    response_dict['Status'] = "ERROR"
    try:
        data = findCommonNameFromOfficial(user_selection)        
        if data[1] == -1:
            data = findCommonNameFromOfficial(user_selection, True)        
        response_dict['Status'] = "OK"
        response_dict['Ingredient ID'] = data[1]
        response_dict['Official Name'] = info_dict["Official Name"]
        response_dict['Category'] = "DEPREICATED"
        response_dict['Common Name'] = data[0]
    except:
        pass
    return response_dict

@app.route('/api/user/get/', methods=['POST'])
def userinfo():
    info_dict = request.json
    key = info_dict["key"]
    response = {}
    response["Status"] = "ERROR"
    try:        
        user = dbConnector.getUserInfoFromKey(key)            
        if user:    
            response["Status"] = "OK"
            response["Display Name"] = user["display_name"]
        else:
            response["Status"] = "INVALID TOKEN"
    except:
        print("No database connection")
        pass
    return response
    
@app.route('/api/user/new/', methods=['POST'])
def makeNewUser():
    """    
        Handles adding a new user to the database

        INPUT:
        Expects a JSON object in the request data that is in this format:
        {
            "password": "password",
            "email": "email@email.com",
            "display_name" "Display Name"
        }

        
        OUTPUT:
        {            
            "Status": "OK",                    
        }


        TODO:
        -Hash Passwords Before Sending
        -Email Verification
        -Handle different cases in the response i.e
            -Invalid Password
            -Invalid Email
        
        Sample curl tester:                        
        curl -d '{"email":"rhys@rhyssullivan.com", "password":"passowrd", "display_name":"rhysS"}' -H "Content-Type: application/json" -X POST http://127.0.0.1:5000/api/user/new 
    """
     
    # TODO ADD ERROR HANDLING
    info_dict = request.json
    password = info_dict['password']
    username = info_dict['email']
    display_name = info_dict['display_name']
    
    dbConnector.addNewUser(username, password, display_name)
    
    login_token = random.randrange(0,1000000) # TODO: Generate on client? Encrypt before sending back?            
    response_dict = {}
    while(dbConnector.checkIfTokenIsInUse(login_token)):
        login_token = random.randrange(0,1000000)
    
    user_info = dbConnector.getUserInformation(username)
    dbConnector.updateUserLoginToken(user_info[0], login_token)
    response_dict = {}
    response_dict["login_token"] = login_token    
    response_dict["Status"] = "OK"
    return response_dict

@app.route('/api/user/login/',methods=['POST'])
def login():
    info_dict = request.json
    password = info_dict['password']
    email = info_dict['email']
    
    user_info = dbConnector.getUserInformation(email)

    response_dict = {}
    response_dict["Status"] = "ERROR"
    
    try:
        server_password = user_info[2] # TODO Split up into specific password call? Indexing directly is ugly and insecure
        display_name = user_info[3]
        if server_password == password:
            response_dict["display_name"] = display_name
            response_dict["Status"] = "OK"
            
            login_token = random.randrange(0,1000000) # TODO: Generate on client? Encrypt before sending back?            
            while(dbConnector.checkIfTokenIsInUse(login_token)):
                login_token = random.randrange(0,1000000)
            
            dbConnector.updateUserLoginToken(user_info[0], login_token)
            response_dict["login_token"] = login_token
            return response_dict
        else:
            response_dict["Status"] = "INVALID PASSWORD"
            return response_dict
    except TypeError:
        response_dict["Status"] = "INVALID EMAIL"
        return response_dict    

@app.route('/api/user/pantry/get/', methods=['POST'])
def getUserPantryItems():
    # curl -d '{"key":594730}' -H "Content-Type: application/json" -X POST http://127.0.0.1:5000/api/user/pantry/get
    info_dict = request.json
    key = info_dict["key"]
    response = {}
    response["Status"] = "OK"
    user = dbConnector.getUserInfoFromKey(key)    
    if user:    
        pantry_items = dbConnector.getAllItemsInPantry(user["pantry_id"])
        
        items = []
        for item in pantry_items:
            item_dict = {}
            item_dict["name"] = item[4]        
            item_dict["dispName"] = item[4]
            item_dict["quantity"] = "32"
            item_dict["expDate"] = "November 3, 2015"
            item_dict["price"] = 1.52
            items.append(item_dict)
        if len(items) != 0:
            response["items"] = items
        else:
            print("hello")
            response["Status"] = "EMPTY"
    else:
        response["Status"] = "INVALID TOKEN"
    return response

@app.route('/api/user/pantry/add/', methods=['POST'])
def addUserPantryItem():
    info_dict = request.json
    key = info_dict["key"]    
    user = dbConnector.getUserInfoFromKey(key)    
    pantry_item = info_dict # TODO: Add input validation
    response_dict = {}
    if user:        
        dbConnector.addItem(user["pantry_id"], pantry_item)            
        response_dict["Status"] = "OK"
    else:
        response_dict["Status"] = "INVALID TOKEN"
    return response_dict

@app.route('/api/user/pantry/add/', methods=['POST'])
def removeUserPantryItem():
    info_dict = request.json
    key = info_dict["key"]    
    user = dbConnector.getUserInfoFromKey(key)    
    pantry_item = info_dict # TODO: Add input validation
    response_dict = {}
    try:
        item_id = pantry_item["item_id"]
    except:
        response_dict["Status"] = "INVALID ITEM ID"
        return response_dict
                
    if user:        
        dbConnector.addItem(user["pantry_id"], item_id)            
        response_dict["Status"] = "OK"
    else:
        response_dict["Status"] = "INVALID TOKEN"
    return response_dict

@app.route('/api/user/pantry/recipes/matching', methods=['POST'])
def getMatchingRecipes():
    # curl -d '{"key":'868911'}' -H "Content-Type: application/json" -X POST http://127.0.0.1:5000/api/user/pantry/recipes/matching
    info_dict = request.json
    key = info_dict["key"]    
    user = dbConnector.getUserInfoFromKey(key)    
    response_dict = {}
    if user:
        recipe_matches = dbConnector.getMatchingRecipes(user["pantry_id"], min_number_matched_ingredients=4)
        response_dict["Status"] = "OK"
        recipe_ids = [x[1] for x in recipe_matches]        
        response_dict["recipes"] = dbConnector.getRecipesByIDs(recipe_ids)
    else:
        response_dict["Status"] = "INVALID TOKEN"
    return response_dict

if __name__== '__main__':
    app.run(host="0.0.0.0")