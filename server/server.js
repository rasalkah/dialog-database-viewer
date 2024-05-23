var express = require('express');		// call express
var https      = require('https');
var url       = require('url');
var fs        = require('fs');
var app = express(); 				// define our app using express
var port = 5747

// set static files location
// used for requests that our frontend will make
app.use(express.static(__dirname + '/public'));

// START THE SERVER
// ====================================
app.listen(port);
console.log('Magic happens on port ' + port);

function getRemoteFile(file, url) {
    let localFile = fs.createWriteStream(file);
    const request = https.get(url, function(response) {
        var len = parseInt(response.headers['content-length'], 10);
        var cur = 0;
        var total = len / 1048576; //1048576 - bytes in 1 Megabyte

        response.on('data', function(chunk) {
            cur += chunk.length;
        });

        response.on('end', function() {
            console.log("Download complete");
        });

        response.pipe(localFile);
    });
}

getRemoteFile('../web/public/regulations.xml', 'https://dialog.beta.gouv.fr/api/regulations.xml')

app.get('/reloadRegulations', (req, res) => {
	getRemoteFile('../web/public/regulations.xml', 'https://dialog.beta.gouv.fr/api/regulations.xml')
});