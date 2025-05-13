
// script.js

document.getElementById('laptop').addEventListener('click', () => vote('Laptop'));
document.getElementById('desktop').addEventListener('click', () => vote('Desktop'));

function vote(option) {
    fetch('/vote', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ option })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('message').innerText = data.message;
        fetchResults();
    })
    .catch(error => console.error('Error:', error));
}

function fetchResults() {
    fetch('/results')
        .then(response => response.json())
        .then(data => {
            document.getElementById('results').innerText = `Laptop: ${data.Laptop}, Desktop: ${data.Desktop}`;
        });
}
