var express = require("express");
var bodyParser = require("body-parser");

var config = require("./config");
var utility = require("./utils/utility");
var loginapi = require("./api/login");
var registerapi = require("./api/register");

var server = express();

// serving static files from public folder
server.use(express.static("../public"));

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// connect to mongodb
utility.connectToMongoDB(config["connection-url"]);

server.post("/register", function(req, res){
	registerapi.register(req.body, function(response){
		console.log(response);
		return res.json(response);
	});
});

server.post("/login", function(req, res){
	var result = loginapi.validateLogin(req.body);
	if(result.errorCode){
		return res.json(result);	
	}
	var isValid = loginapi.validatePassword(req.body.password, result.user.password);
	if(!isValid){
		return res.json({errorCode: 101, message: "Invalid password !"});
	}
	return res.json(result);
	
});

server.listen(process.env.PORT || 3000);
console.log("Server is up and running...");