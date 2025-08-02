var express = require('express');
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'main.html'));
});

app.listen(3000, function() {
    console.log('Server running on http://localhost:3000');
});