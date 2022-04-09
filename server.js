const express = require('express');
const app = express();

var port = 5000

const server = app.listen(port, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%', port))
});

app.get('/app/', (req, res) => {
    res.status(200).end('working');
    res.type('text/plain');
});


app.use(function (req, res) {
    res.status(404).end('Endpoint does not exist');
    res.type("text/plain")
});