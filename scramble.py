import random
import json

# Load the updated JSON data from the file
file_path = 'updated_morphMints_with_tickets.json'
with open(file_path, 'r') as file:
    data = json.load(file)

# Extract the user addresses and raffle ticket numbers
user_addresses = [entry['user'] for entry in data]
ticket_numbers = [entry['raffleTicketNumber'] for entry in data]

# Scramble the user addresses
random.shuffle(user_addresses)

# Scramble the raffle ticket numbers
random.shuffle(ticket_numbers)

# Assign the scrambled raffle ticket numbers to the scrambled user addresses
scrambled_data = [
    {'user': user_addresses[i], 'raffleTicketNumber': ticket_numbers[i]}
    for i in range(len(user_addresses))
]

# Save the scrambled data into a new JSON file
output_file_path = 'scrambled_and_randomized_morphMints.json'
with open(output_file_path, 'w') as output_file:
    json.dump(scrambled_data, output_file, indent=2)

print(f"Updated file saved at: {output_file_path}")
