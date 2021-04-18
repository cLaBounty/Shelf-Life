from barcode_parser import findCommonNameFromOfficial
from os import listdir
from os.path import isfile, join
import json


path = '../Recipe-Scraping/Recipes/'

onlyfiles = [f for f in listdir(path) if isfile(join(path, f))]
#onlyfiles = onlyfiles[3:4]
fail = 0
matches = 0
non_match = 0
for file in onlyfiles:
    f = open(path + file, 'r')
    master_list = open('matchable.txt', 'a')
    block_list = open('unmatchable.txt', 'r+')
    unscanned = open('unscanned.txt', 'a')
    blocked_ings = block_list.read().split('\n')
    file_str = f.read()
    try:
        recipe_dict = json.loads(file_str)
        recipe_ingredients = recipe_dict["Ingredients"]                            
        updated_ingredients = []
        unsearchable = []
        for ingredient in recipe_ingredients:
            ingredient = ingredient.lower()
            if "salt" in ingredient:
                continue            
            try:
                ingredient = ingredient[:ingredient.index("(")]                
            except:
                pass
            try:
                ingredient = ingredient[:ingredient.index("+")]                
            except:
                pass
            try:
                ingredient = ingredient[:ingredient.index(" or ")]                
            except:
                pass
            try:
                ingredient = ingredient[:ingredient.index(" for ")]                
            except:
                pass
            try:
                ingredient = ingredient.replace('-', ' ')
            except:
                pass
            ingredient_name_parts = ingredient.split(' ')
            
            try:
                ingredient_name_parts.remove("fresh")
            except:
                pass
            
            while("" in ingredient_name_parts):
                ingredient_name_parts.remove("")


            common_ingredient = findCommonNameFromOfficial(ingredient_name_parts, False)
            if common_ingredient == 'NOT FOUND':
                manual_entry = False
                if manual_entry and not(ingredient in blocked_ings):
                    print(ingredient + ' (y/n) ')                
                    if(input() == 'y'):
                        master_list.write(ingredient + '\n')
                    else:
                        block_list.write(ingredient + '\n')
                elif manual_entry == False:
                    unscanned.write(ingredient + '\n')
                non_match += 1
                unsearchable.append(ingredient)
            else:
                matches += 1
                updated_ingredients.append(common_ingredient[1])

        recipe_dict["Searchable Ingredients"] = updated_ingredients
        recipe_dict["Ingredients"] = unsearchable
        recipe_name = file
        try:
            f = open('Recipes/{0}'.format(recipe_name), 'x')
        except FileExistsError:
            f = open('Recipes/{0}'.format(recipe_name), 'w')
        f.write(json.dumps(recipe_dict))
        f.close()        
    except json.decoder.JSONDecodeError:
        fail += 1        

    f.close()
    master_list.close()
    

print(matches)
print(non_match)