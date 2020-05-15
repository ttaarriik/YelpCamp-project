var express = require("express");
var router = express.Router();
var camps = require("../modules/campground")
var comment = require("../modules/comments");
var middleware = require("../middleware");
var geo = require('mapbox-geocoding');
var FuzzySearch = require("fuzzy-search");
 
geo.setAccessToken('pk.eyJ1IjoidHRhYXJyaWlrMTk5NiIsImEiOiJjazluaWdqcmcwMm9tM2dtcmhucDk0czQ4In0.kwhhtOEaRS8g7E-R05R9BQ');
 

router.get("/", function(req, res){
	
	res.render("landingPage");
})

//INDEX PAGE
router.get("/campgrounds", function(req, res){
	var noMatch = null;
	if(req.query.search){
		const regex = new RegExp(escapeRegex(req.query.search), 'gi');
		camps.find({name: regex }, function(err, campgrounds){
		if(err){
			console.log(err);
		}else if(campgrounds.length < 1){
			var noMatch = "No campgrounds found. Please try again";
			res.render("campgrounds/index", {campgrounds: campgrounds, page: 'campgrounds', noMatch: noMatch});
		}else{
			res.render("campgrounds/index", {campgrounds: campgrounds, page: 'campgrounds', noMatch: noMatch});
		}
	})
		
	}else{
		camps.find({}, function(err, campgrounds){
			if(err){
				console.log(err);
			}else{
				res.render("campgrounds/index", {campgrounds: campgrounds, page: 'campgrounds', noMatch: noMatch});
			}
		})
	}
		
	
})

//NEW PAGE
router.get("/campgrounds/new", middleware.isLoggedIn, function(req,res){
	
	res.render("campgrounds/addNew");
})


//CREATE PAGE
router.post("/campgrounds", middleware.isLoggedIn, function(req,res){
	
	var campground = req.body.name;
	var url = req.body.url;
	var price = req.body.price;
	var location = req.body.location;
	var desc = req.body.desc;
	var author = {
		id: req.user._id,
		username: req.user.username
	
	};
	geo.geocode('mapbox.places', location , function (err, geoData) {
      var lng = geoData.features[0].center[0];
	  var lat = geoData.features[0].center[1];
	  var campgroundsNew = {name: campground, image: url, price: price, location: location, lat: lat, lng: lng, description: desc, author: author };
		
		camps.create(campgroundsNew, function(err, camp){
		if(err){
			req.flash("error", err.message);
		}else{
			res.redirect("/campgrounds");
		}
	})	
})
  });
	
	
	
	


//SHOW PAGE

router.get("/campgrounds/:id", function(req, res){
	
	//find the campground with provided ID
	camps.findById(req.params.id).populate("comments").exec(function(err, foundCamp){
		if(err){
			req.flash("error", "That campground does not exist");
		}else{
		//render show template with that campground
			res.render("campgrounds/show", {campground: foundCamp});
		}
	});
	

});

//EDIT PAGE
router.get("/campgrounds/:id/edit", middleware.checkUserOwnership, function(req, res){
	camps.findById(req.params.id, function(err,found){
		if(err){
			res.redirect("/campgrounds");
		}else {
			res.render("campgrounds/edit", {campground: found});

		}
	})
});

router.put("/campgrounds/:id", middleware.checkUserOwnership, function(req, res){
	geo.geocode('mapbox.places', req.body.location, function (err, geoData) {
		
     	var lng = geoData.features[0].center[0];
	  	var lat = geoData.features[0].center[1];
	  	var name = req.body.name;
		var url = req.body.image;
		var price = req.body.price;
		var location = req.body.location;
		var description = req.body.desc
		var campgroundsNew = {name: name, image: url, price: price, location: location, lat: lat, lng: lng, description: description };
		
		camps.findByIdAndUpdate(req.params.id, campgroundsNew , function(err, camp){
		if(err){
			console.log(err);
		}else {
			res.redirect("/campgrounds/" + req.params.id);
			
		}
	})
  })
	
})

//DESTROY ROUTE
router.delete("/campgrounds/:id", middleware.checkUserOwnership, function(req, res){
	camps.findByIdAndDelete(req.params.id, function(err, removedCamp){
		if(err){
			res.redirect("/campgrounds");
		}
		comment.deleteMany( {_id: { $in: removedCamp.comments } }, function(err){
			if (err) {
                console.log(err);
            }
			req.flash("success", "Campground successfully deleted");
            res.redirect("/campgrounds");
		})
	})
});

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};



module.exports = router;