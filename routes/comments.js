var express = require("express");
var router = express.Router();
var camps = require("../modules/campground");
var Comment = require("../modules/comments");
var middleware = require("../middleware");


router.get("/campgrounds/:id/comments/new", middleware.isLoggedIn, function(req, res){
	camps.findById(req.params.id, function(err, camp){
		if(err){
			console.log(err);
		}else {
			res.render("comments/addNew", {camp: camp});
		}
	
	})
	
});

//POST ROUTE COMMENT
router.post("/campgrounds/:id", middleware.isLoggedIn, function(req, res){
	camps.findById(req.params.id, function(err, camp){
		if(err){
			console.log(err);
		}else {
			Comment.create(req.body.comments, function(err, comment){
				if(err){
					console.log(err);
				}else {
					
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					
					camp.comments.push(comment);
					camp.save();
					res.redirect("/campgrounds/" + req.params.id);
				}
			})
		}
	})
});

//EDIT AND UPDATE ROUTES COMMENT
router.get("/campgrounds/:id/:comments_id/edit", middleware.checkCommentOwnership, function(req, res){
	
	Comment.findById(req.params.comments_id, function(err, foundId){
		if(err){
			res.redirect("back");
		}else{
			res.render("editComment", {campgroundId: req.params.id, comment: foundId});
		}
	})
	
});

router.put("/campgrounds/:id/:comments_id", middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndUpdate(req.params.comments_id, req.body.comments, function(err, updatedComment){
		if(err){
			console.log("back");
		}else {
			res.redirect("/campgrounds/" + req.params.id);
		}
	}) 
});

//DELETE ROUTE

router.delete("/campgrounds/:id/:comments_id", middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndRemove(req.params.comments_id, function(err){
		if(err){
			res.redirect("back");
		}else{
			req.flash("success", "Comment deleted");
			res.redirect("/campgrounds/" + req.params.id);
		}
	})
})




module.exports = router;

