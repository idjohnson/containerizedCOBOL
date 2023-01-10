const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const cors = require('cors');
const port = process.env.APP_PORT ?? '4000';
var fs = require("fs");

const { exec } = require("child_process");

app.use(cors());

app.post('/add', (req, res) => {
  let args = req.body;
  const [operandOne, operandTwo] = [Number(args['operandOne']), Number(args['operandTwo'])];
  
  console.log(`Adding ${operandOne} and ${operandTwo}`);

  fs.writeFileSync("input.txt",""); 

  var MaxL = operandOne.length;
  if operandOne.length < operandTwo.length) {
    MaxL = operandTwo.length;
  }
  if ((operandOne.length - operandTwo.length) > 0)
  {
    var newT = "";
    for (let i = 0; i < (operandOne.length - operandTwo.length); i++) {
        newT += "0";
    }
    newT += operandTwo;
    fs.appendFileSync("input.txt", operandOne); 
    fs.appendFileSync("input.txt", newT); 
  } else {
    var newT = "";
    for (let i = 0; i < (operandTwo.length - operandOne.length); i++) {
        newT += "0";
    }
    newT += operandOne;
    fs.appendFileSync("input.txt", newT); 
    fs.appendFileSync("input.txt", operandTwo); 
  }

  
  exec("./cobolApp", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        res.end( `error: ${error.message}` );
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        res.end( `error: ${stderr}` );
    }
    console.log(`stdout: ${stdout}`);
    fs.readFile( __dirname + "/" + "output.txt", 'utf8', function (err, data) {
        console.log( data );
        //res.end( data );
        res.send(data.toString().substring(0,MaxL));
     });
    //res.end( `${stdout}` );
  });

  //let result = operandOne / operandTwo;
 // res.send(result.toString());
});

app.listen(port, () => console.log(`Listening on port ${port}!`));


/*


var express = require('express');
var app = express();

app.get('/runcobol', function (req, res) {
    exec("./cobolApp", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            res.end( `error: ${error.message}` );
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            res.end( `error: ${stderr}` );
        }
        console.log(`stdout: ${stdout}`);
        res.end( `${stdout}` );
    });
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port

   var operandTest = "123456789";
   var operandTttt = "4321";
   var newT = "";

   console.log(`${operandTest.length - operandTttt.length}`);
   console.log(`${operandTttt.length}`);

   for (let i = 0; i < (operandTest.length - operandTttt.length); i++) {
    newT += "0";
   }
   newT += operandTttt;
   console.log(newT);
   console.log(operandTest);
   console.log("Example app listening at http://%s:%s", host, port)
})

*/