# Style the campgrounds page
- Add a better header/title
- Make campgrounds display in a grid

# Style the Navbar and Form
- Add a navbar to all templates
- Style the new campground form

# Add Mongoose
- Install and configure mongoose
- Setup campground model
- Use campground model inside of our routes!

#Show Page
- Review the RESTful routes we've seen so far
- Add description to our campground model
- Show db.collection.drop() - deletes everything in DB
- Add a show route/template

RESTFUL ROUTES
name        url         verb        description
===============================================================
- INDEX     /dogs       GET         Display a list of all dogs
- NEW       /dogs/new   GET         Display form to make a new dogs
- CREATE    /dogs       POST        Add new dog to DB
- SHOW      /dogs/:id   GET         Show info about one dog 


#Refactor Mongoose Code
- Create a models directory
- Use module.exports
- Require everything correctly!

#Add Seeds File
- Add a seeds.js file
- Run the seeds file every time the server starts

#Add the Comment model!
- Make our errors go away!
- Display comments on campground show page

#Comment New/Create
- Discuss nested routes
    - NEW       campgrounds/:id/comments/new    GET
    - CREATE    campgrounds/:id/comments        POST
- Add the comment new and create routes
- Add the new comment form

##Style Show Page
- Add sidebar to show page
- Display comments nicely

##Finish Styling Show Page
- Add public directory
- Add custom stylesheet

##Add User Model
- Install all packages needed for auth
- Define User Model

##Auth Pt. 2 - Register
- Configure Passport
- Add register routes
- Add register template

##Auth Pt. 3 - Login
- Add login routes
- Add login template

##Auth Pt. 4 - Logout/Navbar
- Add logout route
- Prevent user from adding a comment if not signed in
- Add links to navbar

##Auth Pt. 5 - Show/Hide Links
- Show/hide auth links correctly

##Refactor The Routes
- Use Express router to reorganize all routes

##Users + Comments
- Associate users and comments
- Save author's name to a comment automatically

##Users + Campgrounds
- Prevent an unauthenticated user from creating a campground
- Save username+id to newly created campground

# Editing Campgrounds
- Add Method-Override
- Add Edit Route for Campgrounds
- Add link to Edit page
- Add Update Route

#Deleting Campgrounds
- Add Destroy Route
- Add Delete button

#Authentication - finding out if someone is who they say they are
#Authorization - once you identified who the user is, you figure out what they are allowed to do (permissions)
- User can only edit his/her campgrounds
- User can only delete his/her campgrounds
- Hide/Show edit and delete buttons

#Editing Comments
- Add Edit route for comments
- Add Edit button
- Add Update route

<!--/campgrounds/:id/edit-->
<!--/campgrounds/:id/comments/:comment_id/edit-->

#Deleting Comments
- Add Destroy route
- Add Delete button

<!--Campground Destroy Route: /campgrounds/:id-->
<!--Comment Destroy Route: /campgrounds/:id/comments/:comment_id-->

#Authorization Part 2: Comments
- User can only edit his/her comments
- User can only delete his/her comments
- Hide/Show edit and delete buttons
- Refactor Middleware

#Adding in Flash!
- Demo working version
- Install and configure conntect-flash
- Add bootstrap alerts to header

#Style the landing page
- Adds a background slider to change the background every few seconds

#Dynamic price
- Add a personal campground price