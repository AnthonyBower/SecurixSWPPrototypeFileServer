var express = require('express'),
    fs = require('fs'),
    cors = require('cors'),
    port = 3030,
    app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/files/:filename', (req, res) => {
    //return relevant info from filename
    console.log("Request received for " + req.params.filename + "!");
    fs.readFile(req.params.filename, (err, data) => {
        if(err) {
            console.log("Error!");
            res.writeHead(404);
            res.end(JSON.stringify(err));
            return;
        }
        res.writeHead(200);
        res.end(data);
    });
});

app.put('/file/:filename', (req, res) => {
    fs.writeFile(dir + req.params.filename, req.body.body, (err) => {
        if(err) {
            res.writeHead(400);
            res.end(JSON.stringify(err));
            return;
        }
        res.sendStatus(200);
    });
});

app.listen(port, () => {
    console.log("File server running on port " + port);
});