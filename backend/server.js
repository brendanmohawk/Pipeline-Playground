
// server.js

const express = require('express');
const cors = require('cors');
const redis = require('redis');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());


const client = redis.createClient({
    url: 'redis://redis:6379'
});

client.on('error', (err) => {
    console.error('Redis error:', err);
});

client.connect().then(() => {
    console.log('Connected to Redis');
});

let votes = {
    Laptop: 0,
    Desktop: 0
};

// POST route to vote
app.post('/vote', async (req, res) => {
    const { option } = req.body;

    if (option !== 'Laptop' && option !== 'Desktop') {
        return res.status(400).send({ message: 'Invalid option!' });
    }

    try {
        const newVoteCount = await client.incr(option);
        res.status(200).send({ message: 'Vote counted!', newVoteCount });
    } catch (err) {
        console.error('Error incrementing vote:', err);
        res.status(500).send({ message: 'Internal server error' });
    }
});

// GET route for results
app.get('/results', async (req, res) => {
    try {
        const [laptopVotes, desktopVotes] = await client.mGet(['Laptop', 'Desktop']);
        const results = {
            Laptop: parseInt(laptopVotes, 10) || 0,
            Desktop: parseInt(desktopVotes, 10) || 0,
        };
        res.json(results);
    } catch (err) {
        res.status(500).send({ message: 'Error fetching results' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
