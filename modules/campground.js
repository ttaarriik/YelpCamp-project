var mongoose = require("mongoose");
 
var campgroundSchema = new mongoose.Schema({
   name: String,
   image: String,
   price: String,
   location: String,
   lat: Number,
   lng: Number,
   description: String,
   createdAt: {type: Date, default: Date.now},
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ],
   author: {
	   id: {
		   type: mongoose.Schema.Types.ObjectId,
		   ref: "User"
	   },
	   username: String
   }	
});
 
module.exports = mongoose.model("Campground", campgroundSchema);