import mysql.connector
import os
from dotenv import load_dotenv
from ingredient_matcher import convertIDtoName
# TODO: Wrap all this in a class?
# https://dev.mysql.com/doc/connector-python/en/connector-python-example-connecting.html

# This is looking for a .env file with the database password, it's in a seperate file so that it won't be commited to the git repository
load_dotenv()
TOKEN = os.getenv('DB_PASSOWRD')

doPermanentChanges = True # If this is True, the changes you make will affect the database, otherwise it will just store them locally
onlineIDs = True
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

def getUserInformation(email):
    db = getDatabase()
    cursor = db.cursor()
    query = ('''SELECT * FROM Users WHERE email="{0}"'''.format(email))
    cursor.execute(query, params=None)
    output = cursor.fetchone()            
    closeDatabase(db)
    return output

def getUserInfoFromKey(key):        
    db = getDatabase()
    cursor = db.cursor()
    query = ('''SELECT * FROM Users WHERE login_token="{0}"'''.format(key))
    cursor.execute(query, params=None)
    output = cursor.fetchone()            
    closeDatabase(db)
    user_info = {
        "user_id": output[0],
        "email": output[1],
        "password": output[2],
        "display_name": output[3],
        "date_added": output[4],
        "pantry_id": output[5],
        "login_token": output[6]
    }
    return user_info

def checkIfTokenIsInUse(new_login_token):
    db = getDatabase()
    cursor = db.cursor()
    query = ('''SELECT user_id FROM Users WHERE login_token={0}'''.format(new_login_token))
    cursor.execute(query, params=None)
    output = cursor.fetchone()
    closeDatabase(db)
    return type(output) != type(None)

def updateUserLoginToken(user_id, new_login_token):
    db = getDatabase()
    cursor = db.cursor()
    query = ('''UPDATE Users SET login_token={0} WHERE user_id={1}'''.format(new_login_token, user_id))
    cursor.execute(query, params=None)
    commitToDB(db)
    closeDatabase(db)

def getAllItemsInPantry(pantry_id):
    db = getDatabase()
    cursor = db.cursor()
    query = ('''SELECT * FROM pantries_ingredients_xref WHERE pantry_id={0}'''.format(pantry_id))
    cursor.execute(query, params=None)
    output = cursor.fetchall()            
    closeDatabase(db)
    return output

def addItem(pantry_id, item_info):
    db = getDatabase()
    cursor = db.cursor()            

    item_id_query = ('''SELECT MAX(item_id) FROM shelfLifeDB.pantries_ingredients_xref WHERE pantry_id={0};'''.format(pantry_id))
    cursor.execute(item_id_query, params=None)    
    item_id = cursor.fetchone()            
    if item_id[0] == None:
        item_id = 1
    else:
        item_id = item_id[0] + 1


    item_official_name = item_info["item_official_name"]
    try:
        ingredient_id = item_info["ingredient_id"]        
    except:
        ingredient_id = -1

    try:
        barcode = int(item_info["barcode"])
    except:
        barcode = -1
    
    try:
        barcode_already_exists_query = ('''SELECT * FROM barcode_nutrition_xref WHERE barcode={0}'''.format(barcode))
        cursor.execute(barcode_already_exists_query, params=None)    
        output = cursor.fetchall()
        if len(output) == 0:
            nutrition_info = item_info["nutrition_info"]        
            if nutrition_info["Status"] == 'OK':            
                fields = "barcode, "
                values = "{0}, ".format(barcode)            
                nutrition_fields = ["fat","carbohydrates","cholesterol","proteins","sodium" ]
                for i in range(len(nutrition_fields)):                
                    field = nutrition_fields[i]
                    try:
                        val = nutrition_info[field]
                    except:
                        continue
                    values += str(val)
                    fields += field

                    if i != len(nutrition_fields)-1:
                        fields += ',' 
                        values += ','            
                    
                nutrition_query = ('''INSERT INTO barcode_nutrition_xref({0}) VALUES ({1})'''.format(fields, values))            
                cursor.execute(nutrition_query, params=None)            
    except:
        pass
    
    category = item_info["category"]
    price = item_info["price"]    
    if type(price) != int:
        if type(price) == str and len(price) > 0:
            price = int(price)
        else:
            price = -1
    query = ('''INSERT INTO pantries_ingredients_xref(pantry_id, ingredient_id, item_official_name, item_id, barcode, category, price)
    VALUES ({0}, {1}, "{2}", {3}, {4}, "{5}", {6})'''
    .format(pantry_id, ingredient_id, item_official_name, item_id, barcode, category, price))
    cursor.execute(query, params=None)    
    commitToDB(db)
    closeDatabase(db)

def deleteItemFromPantry(pantry_id, item_id):
    db = getDatabase()
    cursor = db.cursor()    
    query = ('''DELETE FROM pantries_ingredients_xref WHERE pantry_id={0} AND item_id={1};'''.format(pantry_id, item_id))    
    cursor.execute(query, params=None)
    commitToDB(db)    
    closeDatabase(db)

def generateNewPantry():
    db = getDatabase()
    cursor = db.cursor()
    pantry_id = 1
    query = ('''INSERT INTO Pantries(pantry_id) VALUES ({0})'''.format(pantry_id))
    cursor.execute(query, params=None)
    commitToDB(db)    
    closeDatabase(db)

def getPantryNutritionInfo(pantry_id):
    db = getDatabase()
    cursor = db.cursor()
    barcode_query = ('''SELECT barcode FROM pantries_ingredients_xref WHERE barcode > 0 AND pantry_id = {0};'''.format(pantry_id))
    cursor.execute(barcode_query, params=None)
    output = cursor.fetchall()           
    barcodes = [x[0] for x in output]
    where_clause = generateWhereClauseForIDs(barcodes)
    nutrition_query = ('''SELECT * FROM barcode_nutrition_xref WHERE barcode IN ({0})'''.format(where_clause))    
    cursor.execute(nutrition_query, params=None)
    all_nutrition_info = cursor.fetchall()     

    
    nutrition_fields = ["fat","carbohydrates","cholesterol","proteins","sodium" ]
    pantry_nutrition = {}
    for field in nutrition_fields:
        pantry_nutrition[field] = 0
         
    for nutrition_info in all_nutrition_info:     
        for i in range(len(nutrition_fields)):
            field = nutrition_fields[i]
            if nutrition_info[i+1] != None:
                pantry_nutrition[field] += nutrition_info[i+1]    
    return pantry_nutrition

def getPantryPriceInfo(pantry_id):
    db = getDatabase()
    cursor = db.cursor()
    pricing_query = ('''
    SELECT price, category FROM pantries_ingredients_xref WHERE pantry_id={0} AND category IS NOT NULL AND price IS NOT NULL
    '''.format(pantry_id))
    cursor.execute(pricing_query, params=None)
    output = cursor.fetchall()           
    all_categories = []
    chart_dict = {}
    total = 0
    for entry in output:
        amount = entry[0]
        category = entry[1]        
        total += amount        
        if not(category in all_categories):
            all_categories.append(category)
            chart_dict[category] = amount
        else:
            chart_dict[category] += amount
    
    for category in all_categories:
        chart_dict[category] = chart_dict[category] / total
    response_dict = {}
    if len(all_categories) > 0:
        response_dict["success"] = "OK"
    else:
        response_dict["success"] = "ERROR"
    response_dict["all_categories"] = all_categories
    response_dict["data"] = chart_dict
    return response_dict
    
    
"""

RECIPE STUFF

"""


def convertCursorOutputToJSON(output):
    recipe_dict = {}  
    recipe_dict["name"] = output[1]
    recipe_dict["image"] = output[2]
    recipe_dict["recipe url"] = output[3]
    recipe_dict["category"] = output[4]
    recipe_dict["number of ingredients"] = output[5]
    recipe_dict["favorite"] = False
    recipe_dict["dispName"] = recipe_dict["name"]
    recipe_dict["desc"] = "TODO"
    recipe_dict["quantity"] = [1,2]
    return recipe_dict

def getRecipeByID(id):
    db = getDatabase()
    cursor = db.cursor()
    query = ('''SELECT * FROM Recipes WHERE recipe_id={0}'''.format(id))
    cursor.execute(query, params=None)
    output = cursor.fetchone()           
    closeDatabase(db)
    recipe_dict = convertCursorOutputToJSON(output)      
    recipe_dict["searchable ingredients"] = getSearchableIngredientsOfRecipe(id, True)
    recipe_dict["ingredients"] = getIngredientsOfRecipe(id)    
    return recipe_dict

def generateWhereClauseForIDs(ids):
    where_clause = ""
    for i in range(len(ids)):
        where_clause += str(ids[i]) 
        if i != len(ids)-1:
            where_clause += ', '
    return where_clause

def getRecipesByIDs(ids):
    db = getDatabase()
    cursor = db.cursor()
   
    where_clause = generateWhereClauseForIDs(ids)
    query = ('''SELECT * FROM Recipes WHERE recipe_id IN ({0})'''.format(where_clause))    
    cursor.execute(query, params=None)
    recipes = cursor.fetchall()        
    converted_recipes = []
    ingredients = getIngredientsOfIDs(ids)
    searchable_ingredients = getSearchableIngredientsOfIDs(ids)
    for recipe in recipes:
        recipe_info = convertCursorOutputToJSON(recipe)                
        recipe_ings = []
        recipe_amounts = []
        for entry in ingredients[str(recipe[0])]:
            recipe_ings.append(entry)
            recipe_amounts.append(0)
        for entry in searchable_ingredients[str(recipe[0])]:
            recipe_ings.append(entry)
            recipe_amounts.append(0)
        recipe_info["quantity"] = recipe_amounts
        recipe_info["ingredients"] = recipe_ings        
        converted_recipes.append(recipe_info)
    closeDatabase(db)       
    return converted_recipes

def getAllRecipes():
    # TODO: Result caching so we don't constantly call out to SQL database?
    db = getDatabase()
    cursor = db.cursor()
    query = ('''SELECT * FROM Recipes''')
    cursor.execute(query, params=None)
    output = cursor.fetchall()            
    closeDatabase(db)
    return output

def getSearchableIngredientsOfIDs(ids):
    db = getDatabase()
    cursor = db.cursor()
    where_clause = generateWhereClauseForIDs(ids)
    query = ('''SELECT recipe_id, ingredient_id FROM recipes_searchable_ingredients_xref WHERE recipe_id IN ({0})'''.format(where_clause))        
    cursor.execute(query, params=None)
    output = cursor.fetchall()               
    closeDatabase(db)
    recipe_table = {}
    for entry in output:
        key = str(entry[0])
        ing_name = getNameFromID(entry[1])
        try:
            table_entry = recipe_table[key]                    
            table_entry.append(ing_name)
            recipe_table[key] = table_entry
        except KeyError:
            recipe_table[key] = [ing_name]    
    return recipe_table

def getIngredientsOfIDs(ids):
    db = getDatabase()
    cursor = db.cursor()
    where_clause = generateWhereClauseForIDs(ids)
    query = ('''SELECT recipe_id, ingredient_name FROM recipes_ingredients_xref WHERE recipe_id IN ({0})'''.format(where_clause))        
    cursor.execute(query, params=None)
    output = cursor.fetchall()               
    closeDatabase(db)
    recipe_table = {}
    for entry in output:
        key = str(entry[0])
        ing_name = entry[1]
        try:
            table_entry = recipe_table[key]                    
            table_entry.append(ing_name)
            recipe_table[key] = table_entry
        except KeyError:
            recipe_table[key] = [ing_name]    
    return recipe_table

def getSearchableIngredientsOfRecipe(id, convertFromIDs=False):
    db = getDatabase()
    cursor = db.cursor()
    query = ('''SELECT ingredient_id FROM recipes_searchable_ingredients_xref WHERE recipe_id={0}'''.format(id))
    cursor.execute(query, params=None)
    output = cursor.fetchall()               
    closeDatabase(db)
    if convertFromIDs:
        output = [getNameFromID(x[0]) for x in output]
    return output

def getIngredientsOfRecipe(id):
    db = getDatabase()
    cursor = db.cursor()
    query = ('''SELECT ingredient_name FROM recipes_ingredients_xref WHERE recipe_id={0}'''.format(id))
    cursor.execute(query, params=None)
    output = cursor.fetchall()            
    closeDatabase(db)
    output = [x[0] for x in output]
    return output

def getAllSearchableIngredientsAndRecipes():
    db = getDatabase()
    cursor = db.cursor()
    query = ('''SELECT * FROM recipes_searchable_ingredients_xref''')
    cursor.execute(query, params=None)
    output = cursor.fetchall()            
    closeDatabase(db)    
    return output

def getUserSearchableIngredients(pantry_id):
    db = getDatabase()
    cursor = db.cursor()
    query = ('''SELECT * FROM pantries_ingredients_xref WHERE pantry_id={0} AND ingredient_id!=-1'''.format(pantry_id))
    cursor.execute(query, params=None)
    output = cursor.fetchall()            
    output = [x[1] for x in output]
    closeDatabase(db)
    return output

def getMatchingRecipes(pantry_id, min_number_matched_ingredients=1):
    # responds with a sorted tuple list of [matches, recipeID]
    recipes_and_ingredients = getAllSearchableIngredientsAndRecipes()    
    number_of_recipes = recipes_and_ingredients[len(recipes_and_ingredients)-1][0]+1

    user_ingredients = getUserSearchableIngredients(pantry_id)
    
    # num matches, recipe_id
    matches = []
    for _ in range(number_of_recipes):
        matches.append([0,0])
    
    for entry in recipes_and_ingredients:        
        entry_recipe_id = entry[0]    
        ingredient_id = entry[1]
        if ingredient_id in user_ingredients:
            matches[entry_recipe_id][0] += 1
            matches[entry_recipe_id][1] = entry_recipe_id
    
    
    result = []
    for entry in matches:
        if entry[0] >= min_number_matched_ingredients:
            result.append(entry)

    result.sort(reverse=True)    
    return result
    
def getNameFromID(id):
    if onlineIDs:
        db = getDatabase()
        cursor = db.cursor()
        query = ('''SELECT name FROM Ingredients WHERE ingredient_id={0};'''.format(id))
        cursor.execute(query, params=None)
        output = cursor.fetchone()            
        closeDatabase(db)
        return output[0]
    else:
        return convertIDtoName(id)

if __name__ == '__main__':
    #print(getNameFromID(3))
    #getIngredientsOfIDs([1,2])
    #getSearchableIngredientsOfIDs([1,2,3])
    #getRecipesByIDs([1,2])
    #getMatchingRecipes(1)
    #print(getRecipeByID(43))
    #print(convertIDtoName(1072))
    #getMatchingRecipes()    
    #print(getUserSearchableIngredients())
    #info = getUserInformation("rhys")    
    #pantry_id = info[5]
    #item_info = {}
    #item_info["item_official_name"] = "roscco spaghetti"
    #addItem(pantry_id, item_info)
    #deleteItemFromPantry(pantry_id, 3)
    #getPantryNutritionInfo(1)
    getPantryPriceInfo(1)
    #print(getAllItemsInPantry(pantry_id))
    #print(checkIfTokenIsInUse(233))
    #print(getNameFromID(4))
