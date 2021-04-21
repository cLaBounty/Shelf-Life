import mysql.connector
import os
from dotenv import load_dotenv
from os import listdir
from os.path import isfile, join
import json

# TODO: Wrap all this in a class?
# https://dev.mysql.com/doc/connector-python/en/connector-python-example-connecting.html

# This is looking for a .env file with the database password, it's in a seperate file so that it won't be commited to the git repository
load_dotenv()
TOKEN = os.getenv('DB_PASSOWRD')

doPermanentChanges = True # If this is True, the changes you make will affect the database, otherwise it will just store them locally
def getDatabase():
    return mysql.connector.connect(user='admin', password=TOKEN,
                              host='shelflife.cizcr7arqko1.us-east-2.rds.amazonaws.com',
                              database='shelfLifeDB', buffered=True)                        

def closeDatabase(db):
    db.close()

def commitToDB(db):
    if doPermanentChanges:        
        db.commit()
        closeDatabase(db)

def addNewUser(email, password, display_name):
    db = getDatabase()
    cursor = db.cursor()
    pantry_id = 1
    query = ('''INSERT INTO Users(email, password, display_name, pantry_id) 
    VALUES ("{0}", "{1}", "{2}", {3})'''.format(
        email,
        password,
        display_name,
        pantry_id))
    cursor.execute(query, params=None)
    commitToDB(db)    
    closeDatabase(db)

def generateSearchableIngredientsSQLEntry(searchable_ingredients, recipe_id, notLastEntry):
    entry_str = ""
    for index in range(len(searchable_ingredients)):
        entry_str += '''({0}, {1})'''.format(recipe_id, searchable_ingredients[index])        
        if index != len(searchable_ingredients)-1:
            entry_str += ','
        else:            
            if not(notLastEntry):                                
                entry_str += ';'
            else:
                entry_str += ','                       
    return entry_str


def generateIngredientsSQLEntry(ingredients, recipe_id, notLastEntry):
    entry_str = ""
    for index in range(len(ingredients)):
        ing_name = ingredients[index]
        ing_name = ing_name.replace("'", '`')
        entry_str += '''({0}, '{1}')'''.format(recipe_id, ing_name)        
        if index != len(ingredients)-1:
            entry_str += ','
        else:            
            if not(notLastEntry):                                
                entry_str += ';'
            else:
                entry_str += ','                       
    return entry_str

def addRecipes():
    path = 'Recipes/'
    onlyfiles = [f for f in listdir(path) if isfile(join(path, f))]    
    recipe_values_entry = ""
    searchable_ingredients_value_entry = ""
    ingredients_value_entry = ""
    recipe_id = 0
    for file in onlyfiles:
        f = open(path + file, 'r')                
        notLastEntry = (recipe_id != len(onlyfiles)-1)
        file_str = f.read()
        recipe_dict = json.loads(file_str)            
        name = recipe_dict["Name"]
        image = recipe_dict["Image"]
        recipe_url = recipe_dict["Recipe URL"]
        num_ingredients = recipe_dict["Number of Ingredients"]
        category = recipe_dict["Category"]
        searchable_ingredients = recipe_dict["Searchable Ingredients"]                                        
        unsearchable_ingredients = recipe_dict["Ingredients"]

        searchable_ingredients_value_entry += generateSearchableIngredientsSQLEntry(searchable_ingredients, recipe_id, notLastEntry)
        ingredients_value_entry += generateIngredientsSQLEntry(unsearchable_ingredients, recipe_id, notLastEntry)        

        entry_str = '''({0}, '{1}', '{2}', '{3}', '{4}', {5})'''.format(recipe_id, name, image,
         recipe_url, category, num_ingredients)        
        recipe_values_entry += entry_str
        if notLastEntry:
            recipe_values_entry += ','
        else:
            recipe_values_entry += ';'   
        recipe_id += 1
    
    query = ('''
    INSERT INTO Recipes (
    recipe_id,
    name,
    image,
    url,
    category,
    number_of_ingredients     
    )
    VALUES
    {0}''').format(recipe_values_entry)
    
    db = getDatabase()
    cursor = db.cursor()
    cursor.execute('''DELETE FROM Recipes;''', params=None)    
    cursor.execute(query, params=None)    
    
    searchable_ingredient_query = ('''
    INSERT INTO recipes_searchable_ingredients_xref (
    recipe_id,
    ingredient_id
    )
    VALUES
    {0}''').format(searchable_ingredients_value_entry)    
    
    cursor.execute('''DELETE FROM recipes_searchable_ingredients_xref;''', params=None)
    cursor.execute(searchable_ingredient_query)
    
    ingredient_query = ('''
    INSERT INTO recipes_ingredients_xref (
    recipe_id,
    ingredient_name
    )
    VALUES
    {0}''').format(ingredients_value_entry)
    
    cursor.execute('''DELETE FROM recipes_ingredients_xref;''', params=None)
    cursor.execute(ingredient_query)

    commitToDB(db)
    closeDatabase(db)

def addIngredients():
    f = open('FoodMasterLists/all_ingredients.txt')
    ingredient_array = f.read().split('\n')
    values_entry = ""    
    for i in range(len(ingredient_array)):
        ing_name = ingredient_array[i]
        ing_name = ing_name.replace("'", '`')
        entry_str = '''({0}, '{1}')'''.format(i, ing_name)        
        values_entry += entry_str
        if i != len(ingredient_array) - 1:
            values_entry += ','
        else:
            values_entry += ';'

    query = ('''
    INSERT INTO Ingredients (
    ingredient_id,
    name        
    )
    VALUES
    {0}''').format(values_entry)
    print(query)
    db = getDatabase()
    cursor = db.cursor()
    cursor.execute('''DELETE FROM Ingredients;''', params=None)
    cursor.execute(query, params=None)
    commitToDB(db)
    closeDatabase(db)

def main():
    addRecipes()

main()