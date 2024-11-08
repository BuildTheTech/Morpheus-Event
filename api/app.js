const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Load the data from the JSON file
let rawData = fs.readFileSync('./scrambled_and_randomized_morphMints.json');
let data = JSON.parse(rawData);

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

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
