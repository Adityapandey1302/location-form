const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname)); // Serve static files (like index.html)

// Route to handle form submission
app.post('/submit', (req, res) => {
    const { name, latitude, longitude } = req.body;
    const data = `Name: ${name}, Latitude: ${latitude}, Longitude: ${longitude}\n`;

    // Log data to console
    console.log(data);

    // Save data to a file
    fs.appendFile('locations.txt', data, (err) => {
        if (err) {
            console.error('Error saving location data:', err);
            res.send('Error saving your data.');
        } else {
            res.send(`Thank you, ${name}. We have captured your location.`);
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});