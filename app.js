const express = require('express');
const exec    = require('child_process').exec;
const  bodyParser = require('body-parser');
const app = express();
const logger = require('morgan');

const projectPath  = process.env.PROJECT_PATH;
const port = process.env.PORT;
const appName = process.env.APP_NAME;

console.log('project path --> ', projectPath);
console.log('port --> ', port);
console.log('app name -->', appName);

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/update', function(req, res) {
    if (req.body.ref === 'refs/heads/release') {
        console.log('Updating repo ... !');
        var child = exec(`cd ${projectPath} && git pull origin release && pm2 restart ${appName}`, function(err, execution) {
            if (err) return res.status(500).send();
        });
    }
    res.send('OK');
});

app.listen(port, function () {
    console.log('app started');
});