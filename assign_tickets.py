import json

# Load the provided JSON data from the file
file_path = 'morphMints.json'
with open(file_path, 'r') as file:
    data = json.load(file)

# Create a new list to store the updated user data with only address and raffle ticket numbers
updated_data = []
ticket_number = 1

# Assign raffle ticket numbers based on the TitanX amount
for entry in data:
    titanX_amount = int(entry['titanXAmount'])
    tickets = titanX_amount // 100000000000000000000000000  # Calculate the number of tickets

    for _ in range(tickets):
        updated_entry = {
            'user': entry['user'],
            'raffleTicketNumber': ticket_number
        }
        updated_data.append(updated_entry)
        ticket_number += 1

# Save the updated data into a new JSON file
output_file_path = 'updated_morphMints_with_tickets.json'
with open(output_file_path, 'w') as output_file:
    json.dump(updated_data, output_file, indent=2)

print(f"Updated file saved at: {output_file_path}")
