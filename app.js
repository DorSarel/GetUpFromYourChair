var express = 	require("express"),
	app 	=	express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res){
	res.render("index.ejs");
});

app.listen(3000, "localhost", function(){
	console.log("Server is on....");
});