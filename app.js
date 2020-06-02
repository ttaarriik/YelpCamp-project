//GET ALL THE PACKAGES
var express = require("express"),
 	app = express(),
 	parse = require("body-parser"),
	mongoose = require("mongoose"),
	camps = require("./modules/campground"),
	Comment = require("./modules/comments"),
	seedDB = require("./seed"),
	User = require("./modules/user"),
	passport = require("passport"),
	localStrategy = require("passport-local"),
	passportLocalMongoose = require("passport-local-mongoose"),
	campgroundRoute = require("./routes/campgrounds"),
	commentRoute = require("./routes/comments"),
	indexRoute = require("./routes/index"),
	methodOverride = require("method-override"),
	flash = require("connect-flash");
	

app.use(parse.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname +  "/public"));
app.use(methodOverride("_method"));
app.use(flash());
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

var url = process.env.DATABASE || "mongodb://localhost/campground";

mongoose.connect("mongodb://localhost/campground");

// mongoose.connect("mongodb+srv://ttaarriik:nfhbr1996@cluster0-jspi4.mongodb.net/test?retryWrites=true&w=majority");
// mongoose.connect("mongodb://localhost/campground");
app.locals.moment = require('moment'); //moment is available for use in all of your view files via the variable named moment

//PASSPORT CONFIGURATION


app.use(require("express-session")({
	secret: "Rusty",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	app.locals.currentUser = req.user;
	app.locals.error = req.flash("error");
	app.locals.success = req.flash("success");
	
	next();
})
	



// seedDB();

app.use(indexRoute);
app.use(campgroundRoute);
app.use(commentRoute);







app.listen(process.env.PORT || 3000, function(){
	
	console.log("The server has started!");
})