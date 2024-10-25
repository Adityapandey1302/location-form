const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.post('/submit', (req, res) => {
    const { name, latitude, longitude } = req.body;
    const data = Name: ${name}, Latitude: ${latitude}, Longitude: ${longitude}\n;

    console.log(data);

    fs.appendFile('locations.txt', data, (err) => {
        if (err) {
            console.error('Error saving location data:', err);
            res.send('Error saving your data.');
        } else {
            res.send(Thank you, ${name}. We have captured your location.);
        }
    });
});

app.listen(port, () => {
    console.log(Server is running on port ${port});
});
