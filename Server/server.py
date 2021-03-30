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
    if 'barcode' in params:
        barcode = params['barcode']

        api_response = requests.get(
            'https://world.openfoodfacts.org/api/v0/product/{0}.json'.format(barcode))
        api_response_json = api_response.json()
        
        if api_response_json['status_verbose'] == 'product found':
            response_dict['Status'] = "OK"            
            response_dict["Official Name"] = api_response_json["product"]["product_name_en"]
            return response_dict        
    return response_dict


@app.route('/api/selection/', methods=['GET', 'POST'])
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
    data = findCommonNameFromOfficial(user_selection)

    response_dict = {}
    response_dict['Official Name'] = info_dict["Official Name"]
    response_dict['Category'] = data[0]
    response_dict['Common Name'] = data[1]
    return response_dict


@app.route('/api/user/', methods=['GET'])
def userinfo():
    """    
        Purely a testing function, outputs all of the user information to a webpage
    """
    response = dbConnector.getUserInformation()
    outstr = ""
    for entry in response:
        outstr += str(entry)
    return outstr


@app.route('/api/user/new', methods=['GET', 'POST'])
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

    info_dict = request.json
    password = info_dict['password']
    username = info_dict['email']
    display_name = info_dict['display_name']
    dbConnector.addNewUser(username, password, display_name)
    
    response_dict = {}
    response_dict["Status"] = "OK"
    return response_dict


app.run()