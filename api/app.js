const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Load the data from the JSON file
let rawData = fs.readFileSync('./scrambled_and_randomized_morphMints.json');
let data = JSON.parse(rawData);

app.get('/list', (req, res) => {
    res.send(data);
});

// Endpoint to search by user address
app.get('/search', (req, res) => {
    const user = req.query.user;
    if (!user) {
        return res.status(400).send({ error: 'User address is required' });
    }

    // Find all raffle ticket numbers for the given user
    const tickets = data
        .filter(entry => entry.user === user)
        .map(entry => entry.raffleTicketNumber);

    if (tickets.length === 0) {
        return res.status(404).send({ message: 'No tickets found for this user' });
    }

    res.send({ user, tickets });
});

// Endpoint to search by ticket number
app.get('/searchByTicket', (req, res) => {
    const ticketNumber = req.query.ticketNumber;
    if (!ticketNumber) {
        return res.status(400).send({ error: 'Ticket number is required' });
    }

    // Find the entry with the given raffle ticket number
    const entry = data.find(entry => entry.raffleTicketNumber === ticketNumber);

    if (!entry) {
        return res.status(404).send({ message: 'No user found for this ticket number' });
    }

    res.send({ ticketNumber, user: entry.user });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
