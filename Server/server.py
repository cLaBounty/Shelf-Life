import flask
from flask import request, jsonify
import json
from barcode_parser import findCommonNameFromOfficial
import requests
import mysql.connector
import database_connector as dbConnector
import urllib.parse

# ref: https://programminghistorian.org/en/lessons/creating-apis-with-python-and-flask
app = flask.Flask(__name__)
app.config["DEBUG"] = True

@app.route('/', methods=['GET'])
def home():
    return "<h1> hello </h1>"

@app.route('/api/barcode/', methods=['GET'])
def barcode():    
    # testing code - 737628064502
    params = request.args
    api_response_json = None
    if 'barcode' in params:        
        barcode = params['barcode']        
        
        api_response = requests.get('https://world.openfoodfacts.org/api/v0/product/{0}.json'.format(barcode))
        api_response_json = api_response.json()
        if api_response_json['status_verbose'] == 'product found':
            item_official_name = api_response_json["product"]["product_name_en"]

            
        
            # TODO: Remove any non ABC chars, (include whitespace)
            split_product_name = item_official_name.split(' ')                
            response = "NEED_SELECTION^"
            for x in range(len(split_product_name)-1):
                response += split_product_name[x] + '|'
            response += split_product_name[len(split_product_name)-1] 
            return api_response_json
        else:
            response = "ERROR^Product Not Found"                                            
            return response

    return "error"

@app.route('/api/selection/', methods=['GET'])
def selection():    
    params = request.args    
    if 'selection' in params:        
        data = params[selection]
        official_name = "pizza"
        category = "MISSING"
        common_name = "MISSING"

        data = findCommonNameFromOfficial(data.split('|'))
        category = data[0]
        common_name = data[1]

        response = 'ALL_INFO^' + official_name + '|' + category + '|' + common_name                
        return response
    return "error"

@app.route('/api/user/', methods=['GET'])
def userinfo():               
    response = dbConnector.getUserInformation()    
    outstr = ""
    for entry in response:
        outstr += str(entry)    
    return outstr

@app.route('/api/user/new', methods=['GET', 'POST'])
def makeNewUser():
    """            
        curl -d '{"username":"Rhys Sullivan", "password":"passowrd", "display_name":"rhysS"}' -H "Content-Type: application/json" -X POST http://127.0.0.1:5000/api/user/new 
    """
            
    info_dict = request.json
    print(info_dict)    
    password = info_dict['password']
    username = info_dict['username']
    display_name = info_dict['display_name']
    dbConnector.addNewUser(username, password, display_name)
    return info_dict

app.run()
print("Closed Server")