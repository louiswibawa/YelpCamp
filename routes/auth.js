//=======================================
// Auth routes
//=======================================
app.get("/register", function(req, res){
    res.render("register"); 
});

app.post("/register", function(req, res){
    var newUser = new User({username: req.body.username}); 
    User.register(newUser, req.body.password, function(err, user){ // create a new user
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){ // logging user in
            res.redirect("/campgrounds"); 
        });
    });
});

//show login form
app.get("/login", function(req, res){
    res.render("login"); 
});

//handling login logic
// app.post("/login", middleware, callback)
app.post("/login", passport.authenticate("local", // use local strategy through passportLocalMongoose // logging user in
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res){
});

//logout route
app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}