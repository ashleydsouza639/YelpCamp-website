var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    =  require("passport"),
    LocalStrategy   = require("passport-local"),
    passportLocalMongoose =require("passport-local-mongoose"),
    seedDB      = require("./seeds"),
    methodOverride= require("method-override") ,
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    User        =  require("./models/user"),
    flash=        require("connect-flash");
    
    
var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes    =  require("./routes/index");

    
//seedDB();    //seed the database
mongoose.connect("mongodb://localhost/yelp_camp",{ useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());

//passport config
app.use(require("express-session")({
    secret:"Once again rusty",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());      //passport-local-mongoose
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error   =  req.flash("error");
   res.locals.success   =  req.flash("success");
   next();
});


app.use(indexRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/campgrounds",campgroundRoutes);



//===================
//campgrounds routes
//===================






//===============
//comments routes
//===============



//=============
//auth/ index routes
//===============

const port=3000;
const hostname='127.0.0.1';


app.listen(port,hostname,()=>{
   console.log(`Server running at http://${hostname}:${port}/`);
});


/*
D:\11junny\web_Develoment-master\Yelpcamp>npm install ejs express-session express body-parser mongoo
se passport passport-local passport-local-mongoose method-override connect-flash

to start mongodb server
"C:\Program Files\MongoDB\Server\4.2\bin\mongo.exe"
*/