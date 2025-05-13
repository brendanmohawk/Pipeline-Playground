
// server.js

const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let votes = {
    Laptop: 0,
    Desktop: 0
};

app.post('/vote', (req, res) => {
    const { option } = req.body;
    if (votes[option] !== undefined) {
        votes[option]++;
        res.status(200).send({ message: 'Vote counted!' });
    } else {
        res.status(400).send({ message: 'Invalid option!' });
    }
});
app.get('/results', (req, res) => {
    res.json(votes);
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
