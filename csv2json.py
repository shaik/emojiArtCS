import csv
import json

# Path to your CSV and JSON files
csv_file_path = 'static/emojiColorMap.csv'
json_file_path = 'static/emojiColorMap.json'

# Read the CSV and add the data to a dictionary
data = []
with open(csv_file_path, mode='r', encoding='utf-8') as csv_file:
    csv_reader = csv.DictReader(csv_file)
    for row in csv_reader:
        data.append(row)

# Write the data to a JSON file
with open(json_file_path, mode='w', encoding='utf-8') as json_file:
    json_file.write(json.dumps(data, indent=4))

print(f"CSV data successfully converted to JSON and saved to {json_file_path}")
