var db = require('mongoose');
db.Connection('mongodb://localhost/watch');

var userSchema = new db.Schema(
	{
		id : Number,
		name: String,
		phone: Number,
		email: String,
	}, 
	{
 		collection: 'users'
	}
);

var userModel = db.model('User',userSchema);

function User(user) {
	this.id = user.id;
	this.name = user.name;
	this.phone = user.phone;
	this.email = user.email;
}
function addUser(user) {
	var newUser = new usermodel(User(user))
	newUser.save(function (err) {
		if(err) {
			callback(err)
		}
		console.log('user add，success');
	});
}
userModel.find(function (err,users) {
	if(err) {
		return callback(err)
	}
	console.log(users);
});


module.express = addUser;