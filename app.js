var express = 	require("express"),
	app 	=	express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res){
	res.render("index.ejs");
});

var port = process.env.PORT || 3000;

app.listen(port, function(){
	console.log("Server is on...");
});