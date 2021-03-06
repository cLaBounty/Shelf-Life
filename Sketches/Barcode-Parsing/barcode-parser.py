import json
import csv

# Read from CSV

def main2():
    food_array = []
    with open('all_vegetables.txt') as f:
        all_food_str = f.read()
        food_array = all_food_str.split('\n')


    with open('food.csv') as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        line_count = 0
        next(csv_reader) # Skip Info Line                
        for row in csv_reader:           
            item_official_name = row[2]

def main():


    # Load Food Matches into Memory
    food_array = []
    with open('all_items.txt') as f:
        all_food_str = f.read()
        food_array = all_food_str.split('\n')

    vegetable_array = []
    with open('all_vegetables.txt') as f:
        all_food_str = f.read()
        vegetable_array = all_food_str.split('\n')

    food_array = []
    with open('all_items.txt') as f:
        all_food_str = f.read()
        food_array = all_food_str.split('\n')







    # Handle the item we are currently looking at
    file_to_look_at = 'sample-response.json'
    file_to_look_at = 'spaghetti-response.json'
    with open(file_to_look_at) as f:
        data = json.load(f)
        item_code = data["code"]
        item_official_name = data["product"]["product_name_en"]            
        broken_up_name = item_official_name.split(' ')
        for x in range(len(broken_up_name)):
            broken_up_name[x] = broken_up_name[x].lower()

        # Prompt the User to select which elements they want

        for i in range(len(broken_up_name)):
            print("{0}. {1}".format(i, broken_up_name[i]))
        print("enter numbers to select, 'done' to finish")
        userInput = input()
        elements = []
        while(str(userInput) != ''):
            elements.append(int(userInput))
            userInput = input()
                        

    # "product_name_en": "Table Water Crackers",

main()