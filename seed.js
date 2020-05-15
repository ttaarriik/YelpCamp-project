var Campground = require("./modules/campground"),
	Comment = require("./modules/comments");
var data = [
	{ name: "Camp", 
	 image: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
	 description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
	},
	{ name: "Camp", 
	 image: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
	 description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
	},
	{ name: "Camp", 
	 image: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
	 description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
	}
];

function seedDB(){
	Campground.deleteMany({}, function(err){
		if(err){
			console.log(err);
		}else {
			console.log("campgrounds removed");
		}
		// data.forEach(function(seed){
		// 	Campground.create(seed, function(err, Campground){
		// 		if(err){
		// 			console.log(err);
		// 		}else {
		// 			console.log("Data added!");
					
		// 			Comment.create({
		// 			text: "I am just leaving a comment",
		// 			author: "Homer"
		// 		}, function(err, comment){
		// 			if(err){
		// 				console.log(err);
		// 			}else{
		// 				Campground.comments.push(comment);
		// 				Campground.save();
		// 				console.log("Created comment");
		// 			}
					
					
		// 		});
		// 		}
				
				
		// 	})
		// })
	});
}


module.exports = seedDB;
	