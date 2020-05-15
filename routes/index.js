var express = require("express");
var Campground = require("../modules/campground");
var User = require("../modules/user");
var router = express.Router();
var async = require("async");
var nodemailer = require("nodemailer");
var crypto = require("crypto");



router.get("/register", function(req, res){
	res.render("register", {page: 'register'});
});

router.post("/register", function(req, res){
		
	var username = new User({username: req.body.username,
							 firstName: req.body.firstName,
							 lastName: req.body.lastName,
							 email:	   req.body.email,
							 avatar:   req.body.avatar});
	if(req.body.admin === "1488"){
		username.isAdmin = true;
	}
	User.register(username, req.body.password, function(err, user){
		if(err){
			  req.flash("error", err.message);
			  return res.redirect("/register");
		}
		passport.authenticate("local")(req, res, function(){
			res.redirect("/campgrounds");
		})
	})
})

//LOGIN ROUTE
router.get("/login", function(req, res){
	res.render("login", {page: 'login'});
});


router.post("/login", passport.authenticate("local", {
	
	successRedirect: "/campgrounds",
	failureRedirect: "/login",
	failureFlash: true,
	successFlash: "Welcome"
}), function(req, res){
	
});

//LOGOUT ROUTE
router.get("/logout", function(req, res){
	req.logout();
	req.flash("success", "You have successfully logged out");
	res.redirect("/campgrounds");
});

//USER PROFILE
router.get("/users/:id", function(req, res){
	User.findById(req.params.id, function(err, foundUser){
		if(err){
			req.flash("error", "Something went wrong");
			return res.redirect("/campgrounds");
		}else{
			
			Campground.find().where("author.id").equals(foundUser._id).exec(function(err, foundCamp){
				if(err){
					req.flash("error", "Something went wrong");
					return res.redirect("/campgrounds");
				}else {
					res.render("user/user", {user: foundUser, campground: foundCamp, page: req.params.id});
				}
			})			
		}
	})	
});




module.exports = router;