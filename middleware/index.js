var camps = require("../modules/campground");
var Comment = require("../modules/comments");

var middleware = {};

middleware.checkUserOwnership = function(req, res, next){
	if(req.isAuthenticated()){
		camps.findById(req.params.id, function(err, foundId){
			if(err){
				res.redirect("back");
			}
			if(foundId.author.id.equals(req.user._id) || req.user && req.user.isAdmin)
			{
				next();
			}
			else{
				res.redirect("back");
			}
		})
	}else{
		res.redirect("/login");
	}
}

middleware.checkCommentOwnership = function (req, res, next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comments_id, function(err, foundId){
			if(err){
				res.redirect("back");
			}
			if(foundId.author.id.equals(req.user._id))
			{
				next();
			}
			else{
				res.redirect("back");
			}
		})
	}else{
		req.flash("error", "You need to be logged in to do that");
		res.redirect("/login");
	}
}

middleware.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error", "You need to be logged in to do that");
	res.redirect("/login")
}


module.exports = middleware;