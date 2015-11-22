var express = require("express");
var bodyParser = require("body-parser");
var jwt = require("jsonwebtoken");

var config = require("./config");
var utility = require("./utils/utility");
var loginapi = require("./api/login");
var registerapi = require("./api/register");

var server = express();

// serving static files from public folder
server.use(express.static("../public"));
server.set("secretKey", config.secret);

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
	loginapi.validateLogin(req.body, function(response){
		if(response.errorCode){
			return res.json(response);	
		}
		var isValid = loginapi.validatePassword(req.body.password, response.user[0].password);
		if(!isValid){
			return res.json({errorCode: 101, message: "Invalid password !"});
		}
		// login success and generate token
		var token = jwt.sign(response.user[0], server.get("secretKey"), {
			"expiresInMintues": 1440} // expires in 24 hours
			);
		response.token = token;
		response.user = response.user[0];
		return res.json(response);
	});	
});

server.listen(process.env.PORT || 3000);
console.log("Server is up and running...");