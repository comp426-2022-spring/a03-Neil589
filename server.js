const express = require('express');
const app = express();

var port = 5000

const server = app.listen(port, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%', port))
});

function coinFlip() {
    return Math.random() < 0.5 ? 'heads' : 'tails'
  }

app.get('/app/', (req, res) => {
    res.status(200).end('working');
    res.type('text/plain');
});

app.get('/app/echo/:number', (req, res) => {
    res.status(200).json({'message': req.params.number});
    
});


// app.get('/app/echo/', (req, res) => {
//     res.status(200).json({"message": req.query.number});
// });

app.get('/app/echo/', (req, res) => {
    res.status(200).json({"message": req.body.number});
});

app.get('/app/flip', (req, res) => {
    res.status(200).json({'flip':coinFlip()});
});



app.use(function (req, res) {
    res.status(404).end('Endpoint does not exist');
    res.type("text/plain")
});