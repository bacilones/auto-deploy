const express = require('express');
const exec    = require('child_process').exec;


const app = express();

var projectPath  = process.env.PROJECT_PATH;

app.get('/update', function() {
    var child = exec(`cd ${projectPath} && git pull origin release`, function(err, res) {
        if (err) return res.status(500).send();
        res.send('OK');
    });
});

app.listen(process.env.PORT, function () {
    console.log('app started');
});