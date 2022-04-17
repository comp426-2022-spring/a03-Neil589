


const express = require('express');
const minimist = require('minimist');
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const args = minimist(process.argv.slice(2));
args['port'];
const port = args.port ||process.env.port|| 5000;

// const logging = (req, res, next)=>{
//     console.log(req.body.number)
//     next()
// }


const server = app.listen(port, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%', port))
});

function coinFlip() {
    return Math.random() < 0.5 ? 'heads' : 'tails'
  }


  function coinFlips(flips) {
    if (flips<0||flips==0||typeof flips==="undefined"){flips = 1};
    const results = [];
    for (var i = 0; i < flips; i++) {
      results.push(coinFlip());
    }
    return results;
  }


  function countFlips(array) {
    const counts = {
      tails: 0,
      tails: 0
    };
    array.forEach(index => {
      if (index === 'heads') {
        counts.heads++;
      } else {
        counts.tails++;
      }
    })
    return counts;
  }


  function flipACoin(_call) {
    if (_call !== "heads" && _call !=="tails"){
      // throw new Error("Error: no input.")
      console.log("Error: no input. Usage: node guess-flip --call=[heads|tails]")
      return;
    }
    var results = coinFlip();
    if (results === _call) {
      return {call: _call, flip:results, result:'win'};
    } else {
      return {call: _call, flip:results, result:'lose'};
    }
  }
  



app.get('/app/', (req, res) => {
    res.statusCode=200;
    res.statusMessage='OK';
    res.writeHead(res.statusCode, { 'Content-Type': 'text/plain' });
    res.end(res.statusCode + ' ' + res.statusMessage)});

app.get('/app/flips/:number',(req, res) => {
    res.status(200).json({'raw': coinFlips(req.params.number), 'summary': countFlips(coinFlips(req.params.number))});  
    res.type("text/plain")
});


app.get('/app/flip/call/heads', (req, res) => {
    res.status(200).json(flipACoin("heads"));
});

app.get('/app/flip/call/tails', (req, res) => {
    res.status(200).json(flipACoin("tails"));
});


app.get('/app/flip', (req, res) => {
    res.status(200).json({'flip':coinFlip()});
    // res.type("text/plain")
});


app.use(function (req, res) {
    res.status(404).end('Endpoint does not exist');
    res.type("text/plain")
});