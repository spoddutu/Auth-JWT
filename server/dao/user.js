var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
	_id: String,
	password: String
});

var UserModel = mongoose.model("User", UserSchema);

module.exports = {
	login: function(user, callback){
		UserModel.find({_id: user.email}, function(err, user){
			if(err){
				return callback(err, undefined);
			}
			return callback(undefined, user);
		})
	},
	register: function(user, callback){
		var newUser = new UserModel({_id: user.email, password: user.password});
		newUser.save(user, function(err, user){
			if(err){
				return callback(err, undefined);
			}
			return callback(undefined, user);
		});
	}
};
