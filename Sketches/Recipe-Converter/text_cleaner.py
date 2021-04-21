with open("FoodMasterLists/all_ingredients.txt") as f:
    all_food_str = f.read()    
    food_array = all_food_str.split('\n')    
    for elm in food_array:
        if elm[len(elm)-1] == 's':
            print('yo')