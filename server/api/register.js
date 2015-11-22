var bcrypt = require("bcrypt-nodejs");
var UserDao = require("../dao/user");
var hashPassword = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}
module.exports = {
	register: function(user, callback){
		user.password = hashPassword(user.password);
		UserDao.register(user, function(err, response){
			if(err){
				return callback({errorCode: 102, message: "Email already exists !"});
			}
			return callback({errorCode: undefined, user: response});
		});
	}
};