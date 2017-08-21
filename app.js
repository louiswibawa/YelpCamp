var express         = require("express"),
    app             = express(), 
    bodyparser      = require("body-parser"),
    mongoose        = require("mongoose"),
    flash           = require("connect-flash"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    methodOverride  = require("method-override"),
    Campground      = require("./models/campground"),
    seedDB          = require("./seeds"),
    Comment         = require("./models/comment"),
    User            = require("./models/user");

// requiring routes
var commentRoutes       = require("./routes/comments"),
    campgroundRoutes    = require("./routes/campgrounds"),
    authRoutes          = require("./routes/index");

mongoose.connect("mongodb://localhost/yelp_camp_v13", {useMongoClient: true});
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public")); // __dirname gives the absolute path from root
app.set("view engine", "ejs");
app.use(methodOverride("_method")); // convention
app.use(flash()); // use connect-flash

// seed/fill the database
// seedDB(); // reset all campgrounds and add new ones

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "This is my secret! Don't you dare to look at it!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); // User.authenticate comes from passportLocalMongoose
passport.serializeUser(User.serializeUser()); // User.serializeUser also comes from passportLocalMongoose
passport.deserializeUser(User.deserializeUser()); // User.serializeUser also comes from passportLocalMongoose

// this will be called in all routes
app.use(function(req, res, next){ // enables all routes to be checked by the logical statements in header.ejs
    res.locals.currentUser = req.user; // refer to https://stackoverflow.com/questions/20202980/express-js-passport-js-where-is-req-user-stored
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

//use routes
app.use("/campgrounds", campgroundRoutes); // start search with "/campgrounds", then append the routes (helps DRY code)
app.use("/campgrounds/:id/comments", commentRoutes); // DRY code
app.use("/", authRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp Server has started!"); 
});