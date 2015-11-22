var mongoose = require("mongoose");
module.exports = {
	connectToMongoDB: function(connectionUrl){
		mongoose.connect(connectionUrl);
	}
};