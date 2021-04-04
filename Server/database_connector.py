import mysql.connector
import os
from dotenv import load_dotenv
# TODO: Wrap all this in a class?
# https://dev.mysql.com/doc/connector-python/en/connector-python-example-connecting.html

# This is looking for a .env file with the database password, it's in a seperate file so that it won't be commited to the git repository
load_dotenv()
TOKEN = os.getenv('DB_PASSOWRD')

doPermanentChanges = False # If this is True, the changes you make will affect the database, otherwise it will just store them locally
db = mysql.connector.connect(user='admin', password=TOKEN,
                              host='shelflife.cizcr7arqko1.us-east-2.rds.amazonaws.com',
                              database='shelfLifeDB')                        

def commitToDB():
    if doPermanentChanges:
        db.commit()

def addNewUser(email, password, display_name):
    cursor = db.cursor()
    query = ('''INSERT INTO Users(email, password, display_name) 
    VALUES ("{0}", "{1}", "{2}")'''.format(
        email,
        password,
        display_name))
    cursor.execute(query, params=None)
    commitToDB()    

def getUserInformation(email):
    cursor = db.cursor()
    query = ('''SELECT * FROM Users WHERE email="{0}"'''.format(email))
    cursor.execute(query, params=None)
    return cursor.fetchone()

def addItem():
    cursor = db.cursor()
    query = ('''...''')
    cursor.execute(query, params=None)
    commitToDB()    

if __name__ == '__main__':
    cnx = mysql.connector.connect(user='admin', password='eZOumMxD8vIcx8NqTzMc',
                              host='shelflife.cizcr7arqko1.us-east-2.rds.amazonaws.com',
                              database='shelfLifeDB')  

    print(getUserInformation("rhys_sullivan"))        