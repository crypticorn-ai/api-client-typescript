import csv
import json
import os
from pathlib import Path

def process_csv_files():
    data_folder = Path("data")
    output = {}

    # Ensure the data folder exists
    if not data_folder.is_dir():
        print(f"Error: '{data_folder}' directory not found.")
        return

    # Process each CSV file in the data folder
    for csv_file in data_folder.glob("*.csv"):
        filename = csv_file.stem  # Get the filename without extension
        with open(csv_file, 'r', newline='') as file:
            reader = csv.reader(file)
            data = [row[0] for row in reader if row]  # Assume single column, skip empty rows
        output[filename] = data

    # Write the combined data to a JSON file
    with open("tx.json", "w") as json_file:
        json.dump(output, json_file, indent=2)

    print("Processing complete. Output saved to 'output.json'.")

if __name__ == "__main__":
    process_csv_files()