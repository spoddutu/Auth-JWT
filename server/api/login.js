var bcrypt = require("bcrypt-nodejs");
var UserDao = require("../dao/user");

module.exports = {
	validateLogin: function(user, callback){
		UserDao.login(user, function(err, response){
			if(err){
				return callback({errorCode: 100, message: "Invalid email !"});
			}
			return callback({errorCode: undefined, user: response});
		});
	},
	validatePassword: function(password, hash){
		return bcrypt.compareSync(password, hash);
	}
};