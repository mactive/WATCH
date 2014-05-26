
/*
 * GET home page.
 */
var fs = require('fs');
module.exports = function(app) {
	app.get('/', function (req, res) {
		res.render('index', { title: 'Express' });
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
};