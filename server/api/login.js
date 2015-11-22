var bcrypt = require("bcrypt-nodejs");
var UserDao = require("../dao/user");

module.exports = {
	validateLogin: function(user, callback){
		UserDao.login(user, function(err, response){
			if(err){
				return callback({errorCode: 100, message: "Invalid email !"});
			}
			return callback({errorCode: undeifned, user: response});
		});
	},
	validatePassword: function(user, hash){
		return bcrypt.compareSync(user.password, hash);
	}
};