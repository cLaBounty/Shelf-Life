from os import listdir
from os.path import isfile, join

def readFileIntoArray(fileName):
    with open(fileName) as f:
        all_food_str = f.read()
        food_array = all_food_str.split('\n')   
        return food_array

def convertIDtoName(id):
    arr = readFileIntoArray('FoodMasterLists/all_ingredients.txt')    
    return arr[id]

def findCommonNameFromOfficial(broken_up_name, doWeakMatch=False):
    # Basic fixing of strings     
    for x in range(len(broken_up_name)):
        broken_up_name[x] = broken_up_name[x].lower()          
    
    all_ingredients = readFileIntoArray('FoodMasterLists/all_ingredients.txt')                
    
    info = ('NOT FOUND', -1, False)
    most_partial_match = 0
    for i in range(len(all_ingredients)):
        common_ingredient = all_ingredients[i]
        number_of_matching_name_parts = 0
        perfect_matches = 0
        for common_name_part in common_ingredient.split(" "):                                
            common_name_part_length = len(common_name_part)

            for name_part in broken_up_name:
                name_part_length = len(name_part)
                length_difference = abs(common_name_part_length - name_part_length)

                if length_difference <= 1:
                    if name_part in common_name_part or common_name_part in name_part:                            
                        number_of_matching_name_parts += 1
                        if length_difference == 0:
                            perfect_matches += 1

            perfect_match = (perfect_matches == len(broken_up_name) and perfect_matches == len(common_ingredient.split(" ")))
            partial_match = number_of_matching_name_parts == len(broken_up_name) and len(broken_up_name) == len(common_ingredient.split(" "))
            if doWeakMatch:
                if perfect_match or number_of_matching_name_parts > most_partial_match:
                    info = (common_ingredient, i, False)
                    if perfect_match:
                        return info
            else:
                if partial_match or perfect_match:                    
                    info = (common_ingredient, i, True)
                    if perfect_match:                        
                        return info

    return info

if __name__ == '__main__':    
    print(findCommonNameFromOfficial(['corn']))
    print(findCommonNameFromOfficial(['spaghetti']))
    print(findCommonNameFromOfficial(['chickens','breasts', 'hannafords']))
    print(findCommonNameFromOfficial(['chicken','breats', 'boneless', 'skinless']))
    print(findCommonNameFromOfficial(['chicken','breasts', 'boneless', 'skinless']))
    print(findCommonNameFromOfficial(['macaroni','elbow']))
    print(findCommonNameFromOfficial(['elbow', 'macaroni']))
    print(convertIDtoName(45))