
/*
 * GET home page.
 */

 // dbServer
// var dbServer = require('./routes/dbServer.js');
var fs = require('fs');


module.exports = function(app) {
	app.get('/', function (req, res) {
		res.render('index', { title: 'Express' });
	});

    app.get('/avos', function (req, res) {
        res.render('avos', { title: 'Express' });
    });

    app.get('/users', function (req, res) {
    	fs.readFile('./routes/users.json','utf-8',function (err,data) {
    		if(err) {
    			console.log(err)
    		} else {
    			res.send(data)
    		}
    	});
	});
    app.post('/addUsers', function (req,res) {
        console.log(req.body)
        res.send({success : true});
        res.end();
    });
};