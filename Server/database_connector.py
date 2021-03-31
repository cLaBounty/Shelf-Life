import mysql.connector
import os
from dotenv import load_dotenv

# TODO: Wrap all this in a class?
# https://dev.mysql.com/doc/connector-python/en/connector-python-example-connecting.html

# This is looking for a .env file with the database password, it's in a seperate file so that it won't be commited to the git repository
load_dotenv()
TOKEN = os.getenv('DB_PASSOWRD')

doPermanentChanges = True # If this is True, the changes you make will affect the database, otherwise it will just store them locally
db = mysql.connector.connect(user='admin', password=TOKEN,
                              host='shelflife.cizcr7arqko1.us-east-2.rds.amazonaws.com',
                              database='shelfLifeDB', buffered=True)                        

def commitToDB():
    if doPermanentChanges:
        db.commit()

def addNewUser(email, password, display_name):
    cursor = db.cursor()
    pantry_id = 1
    query = ('''INSERT INTO Users(email, password, display_name, pantry_id) 
    VALUES ("{0}", "{1}", "{2}", {3})'''.format(
        email,
        password,
        display_name,
        pantry_id))
    cursor.execute(query, params=None)
    commitToDB()    

def getUserInformation(email):
    cursor = db.cursor()
    query = ('''SELECT * FROM Users WHERE email="{0}"'''.format(email))
    cursor.execute(query, params=None)
    output = cursor.fetchone()            
    return output

def getUserInfoFromKey(key):
    cursor = db.cursor()
    query = ('''SELECT * FROM Users WHERE login_token="{0}"'''.format(key))
    cursor.execute(query, params=None)
    output = cursor.fetchone()            
    return output

def checkIfTokenIsInUse(new_login_token):
    cursor = db.cursor()
    query = ('''SELECT user_id FROM Users WHERE login_token={0}'''.format(new_login_token))
    cursor.execute(query, params=None)
    output = cursor.fetchone()
    return type(output) != type(None)

def updateUserLoginToken(user_id, new_login_token):
    cursor = db.cursor()
    query = ('''UPDATE Users SET login_token={0} WHERE user_id={1}'''.format(new_login_token, user_id))
    cursor.execute(query, params=None)
    commitToDB()

def getAllItemsInPantry(pantry_id):
    cursor = db.cursor()
    query = ('''SELECT * FROM pantries_ingredients_xref WHERE pantry_id={0}'''.format(pantry_id))
    cursor.execute(query, params=None)
    output = cursor.fetchall()            
    return output

def addItem(pantry_id, item_info):
    cursor = db.cursor()            
    item_official_name = item_info["item_official_name"]
    ingredient_id = 0
    query = ('''INSERT INTO pantries_ingredients_xref(pantry_id, ingredient_id, item_official_name)
    VALUES ({0}, {1}, "{2}")'''
    .format(pantry_id, ingredient_id, item_official_name))
    cursor.execute(query, params=None)    
    commitToDB()
    

def generateNewPantry():
    cursor = db.cursor()
    pantry_id = 1
    query = ('''INSERT INTO Pantries(pantry_id) VALUES ({0})'''.format(pantry_id))
    cursor.execute(query, params=None)
    commitToDB()    

if __name__ == '__main__':
    info = getUserInformation("rhys")    
    pantry_id = info[5]
    item_info = {}
    item_info["item_official_name"] = "roscco spaghetti"
    #addItem(pantry_id, item_info)
    #print(getAllItemsInPantry(pantry_id))
    #print(checkIfTokenIsInUse(233))
    print(getUserInfoFromKey(332026))