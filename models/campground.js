var mongoose = require("mongoose");

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({ // blueprint
    name: String,
    image: String,
    description: String,
    price: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId, // just embed the id of the comments, not the comments themselves
            ref: "Comment" // REFER TO http://mongoosejs.com/docs/populate.html
        }
    ]
});

module.exports = mongoose.model("Campground", campgroundSchema); // transform a model(object) with the blueprint criteria