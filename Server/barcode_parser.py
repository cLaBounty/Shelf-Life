from os import listdir
from os.path import isfile, join

def readFileIntoArray(fileName):
    with open(fileName) as f:
        all_food_str = f.read()
        food_array = all_food_str.split('\n')   
        return food_array

def findCommonNameFromOfficial(broken_up_name):
    # Basic fixing of strings 
    # TODO: HANDLE CASES WHERE IT IS CHICKEN THIGHTS vs THIGH
    for x in range(len(broken_up_name)):
        broken_up_name[x] = broken_up_name[x].lower()          

    onlyfiles = [f for f in listdir('FoodMasterLists/') if isfile(join('FoodMasterLists/', f))]
    all_categories = []
    all_categories_names = []
    for file in onlyfiles:
        array_from_file = readFileIntoArray('FoodMasterLists/'+file)
        all_categories.append(array_from_file[1:])
        all_categories_names.append(array_from_file[0])    
    
    
    info = ['MISSING', 'MISSING']
    
    highest_number_of_matching_name_parts = -1
    for i in range(len(all_categories)):
        for ingredient in all_categories[i]:
            number_of_matching_name_parts = 0

            for name_part in broken_up_name:
                if name_part in ingredient or ingredient in name_part:                    
                    number_of_matching_name_parts += 1
            
            if number_of_matching_name_parts > highest_number_of_matching_name_parts:
                info[0] = all_categories_names[i]
                info[1] = ingredient
                highest_number_of_matching_name_parts = number_of_matching_name_parts

    return info

if __name__ == '__main__':
    #print(findCommonNameFromOfficial(['spaghetti']))
    #print(findCommonNameFromOfficial(['chickens','breasts']))
    #print(findCommonNameFromOfficial(['chicken','breats', 'boneless', 'skinless']))
    print(findCommonNameFromOfficial(['macaroni','elbow']))
    print(findCommonNameFromOfficial(['elbow', 'macaroni']))