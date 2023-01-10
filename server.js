var express = require('express');
var app = express();
var fs = require("fs");

const { exec } = require("child_process");

app.get('/runcobol', function (req, res) {
    exec("./myFirstCob", (error, stdout, stderr) => {
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
   console.log("Example app listening at http://%s:%s", host, port)
})
