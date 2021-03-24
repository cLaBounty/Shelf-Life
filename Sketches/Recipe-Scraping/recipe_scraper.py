import urllib.request
import urllib.error
import urllib.parse
import json
from bs4 import BeautifulSoup
from os import listdir
from os.path import isfile, join

class ParseError(Exception):
    pass

def readCachedHTMLRecipes():
    onlyfiles = [f for f in listdir('HTMLSource/') if isfile(join('HTMLSource/', f))]
    for file in onlyfiles:
        f = open('HTMLSource/'+file, 'r')
        html = f.read()
        page = BeautifulSoup(html, 'html.parser')
        try:
            parseRecipeFromSoup(page, True)
        except ParseError:
            print("Error Reading: " + file)

def readPageIntoSoup(url, writeToFile=False):
    response = urllib.request.urlopen(url)
    page_unparsed = response.read()    
    if writeToFile:
        boilerplate = 'https://www.bigoven.com/recipe/'

        fileName = url[len(boilerplate):].replace('/', '_', 3)
        try:
            f = open('HTMLSource/{0}.html'.format(fileName), 'xb')
        except FileExistsError:
            f = open('HTMLSource/{0}.html'.format(fileName), 'wb')
        f.write(page_unparsed)
        f.close()

    soup = BeautifulSoup(page_unparsed, "html.parser")
    return soup

def parseRecipeFromSoup(page, printToConsole=False, printToFile=True):
    print("=================")
    try:
        url_element = page.find("meta", {"property": "og:url"})
        recipe_url = url_element['content']
        print("Reading: " + recipe_url)

        ingredients_list = page.body.find("ul", {"class": "ingredients-list"})

        # Ingredient Parsing
        all_ingredients_elements = ingredients_list.find_all("span", {"class": "name"})
        all_ingredients = []
        for ingredient in all_ingredients_elements:
            all_ingredients.append(ingredient.get_text())
        
        # Recipe Info Parsing
        recipe_json_script = page.body.find("script", {"type" : "application/ld+json"})                
        recipe_json_info = json.loads(recipe_json_script.string)

        recipe_name = recipe_json_info["name"]
        recipe_image_url = recipe_json_info["image"]
        total_time = recipe_json_info["totalTime"]
        recipe_yield = recipe_json_info["recipeYield"]
        recipe_category = recipe_json_info["recipeCategory"]
                
        

        if(printToConsole):        
            print("Name: " + recipe_name)
            print("Total Time: "+ total_time)
            print("Image: " + recipe_image_url)
            print("Ingredients:")
            for ingredient in all_ingredients:
                print(ingredient)

        if(printToFile):
            recipe_info = {
                "Name": recipe_name,
                "Total Time": total_time,
                "Image": recipe_image_url,
                "Recipe URL": recipe_url,
                "Number of Ingredients": len(all_ingredients),
                "Yield": recipe_yield,
                "Category": recipe_category,
                "Ingredients": all_ingredients
                }
            
            recipe_json_dump = json.dumps(recipe_info)
            try:
                f = open('Recipes/{0}.json'.format(recipe_name), 'x')
            except FileExistsError:
                f = open('Recipes/{0}.json'.format(recipe_name), 'w')
            f.write(recipe_json_dump)
            f.close()
    except:
        raise ParseError  

def parseRecipePage(url):    
    page = readPageIntoSoup(url, True)      
    parseRecipeFromSoup(page)
    
def parseRecipeListPage(url):
    page = readPageIntoSoup(url)

    recipe_list = page.body.find("div", {"id": "resultContainer"})

    all_recipe_urls = recipe_list.find_all("div", {"class": "recipe-tile-full"})
    for element in all_recipe_urls:        
        recipe_url = element["data-url"]
        try:
            parseRecipePage(recipe_url)        
        except ParseError:
            print("Error reading: "+ recipe_url)
            try:
                f = open('Unreadable.txt', 'x')
            except FileExistsError:
                f = open('Unreadable.txt', 'a')
            f.write(recipe_url + '\n')
            f.close()

def scrapeBigOven(start_page, end_page):
    # 24 Recipes Per Page    
    print("Downloading {0} recipes".format( (end_page-start_page) * 24  ))
    for i in range(start_page, end_page+1):        
        parseRecipeListPage("https://www.bigoven.com/recipes/search/page/{0}".format(i))

if __name__ == "__main__":
    #readCachedHTMLRecipes()
    scrapeBigOven(2, 30)
    #parseRecipePage('https://www.bigoven.com/recipe/pumpkin-dinner-rolls/379252')
    #parseRecipePage('https://www.bigoven.com/recipe/chocolate-banana-protein-smoothie/1724542')
