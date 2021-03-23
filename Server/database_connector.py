import mysql.connector
import os
from dotenv import load_dotenv
# TODO: Wrap all this in a class?

load_dotenv()
TOKEN = os.getenv('DB_PASSOWRD')

doPermanentChanges = False
db = mysql.connector.connect(user='admin', password=TOKEN,
                              host='shelflife.cizcr7arqko1.us-east-2.rds.amazonaws.com',
                              database='shelfLifeDB')                        

def commitToDB():
    if doPermanentChanges:
        db.commit()

def getUserInformation():
    cursor = db.cursor()
    query = ("SELECT * FROM Users")
    cursor.execute(query, params=None)
    return cursor

def addNewUser(username, password, display_name):
    cursor = db.cursor()
    query = ('''INSERT INTO Users(username, password, display_name) 
    VALUES ("{0}", "{1}", "{2}")'''.format(
        username,
        password,
        display_name))
    cursor.execute(query, params=None)
    commitToDB()    

def addItem():
    cursor = db.cursor()
    query = ('''...''')
    cursor.execute(query, params=None)
    commitToDB()    

if __name__ == '__main__':
    cnx = mysql.connector.connect(user='admin', password='eZOumMxD8vIcx8NqTzMc',
                              host='shelflife.cizcr7arqko1.us-east-2.rds.amazonaws.com',
                              database='shelfLifeDB')  


