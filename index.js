require('dotenv').config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("cookie-session");
const flash = require("express-flash");
const passport = require("passport");
const cors = require("cors");
const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require("mongodb");
const UserService = require("./src/user"); //need

require("./src/config/passport");
require("./src/config/google");
require("./src/config/github");

mongoose.set('strictQuery', false);
mongoose.connect(
    'mongodb+srv://admin:admin@backendforcourse.emgyltx.mongodb.net/?retryWrites=true&w=majority'
    ).then(()=> {
        console.log("DB is ok")
    }).catch((err) => {
        console.log("Db ERORR", err)
    },
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverApi: ServerApiVersion.v1,
        useFindAndModify: false,
        useCreateIndex: true,
    },
    (error) => {
        if(error) console.log(error);
    }
    )
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
    session(
    {
        name: "session",
        secret: "novikau",
        keys:["mikalainovikau"],
        maxAge: 86400000,
        resave: false,
        saveUninitialized: true,
    }
))
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(
    cors({
        origin:"https://all-movie-reviews.netlify.app/",
        methods:"GET,POST,PUT,DELETE",
        credentials: true,
    })
)

const isLoggedIn = (req, res, next) => {
    req.user ? next() : res.sendStatus(401).json({
        sucess:false,
        message: "False loggin",
    });
};

app.get("/", (req, res) => {
    res.send('Signin');
})

app.get("/auth/login/success", (req,res)=> {
    if(req.user){
        res.status(200).json({
            success: true,
            message: "successfull",
            user: req.user,
        })
    };
    console.log('ok')
});

app.get("/auth/logout", (req,res)=>{
    req.session.destroy(function () {
        res.clearCookie("connect.sid");
        res.redirect("/");
      });
});

app.get("/profile", isLoggedIn, (req, res) => {
    if(req.user){
        res.status(200).json({
            success: true,
            message: "successfull",
            user: req.user,
        })
    };
    console.log('profile')
  });

app.get("/auth/login/failed", (req,res)=> {
    res.status(401).json({
        success: false,
        message: "failure",
    });
});

app.get("/auth/github", passport.authenticate('github', {scope:[
    "profile", "email"
]}));

app.get("/auth/github/callback",
    passport.authenticate("github", {
    successRedirect: "/profile",
    failureRedirect: "/login/failed",
    failureFlash: true,
    successFlash: "Successfully logged in!",
}));

app.get("/auth/google", passport.authenticate('google', {
    scope:["profile", "email"],}));

app.get("/auth/google/callback",
    passport.authenticate("google", {
    successRedirect: "/profile",
    failureRedirect: "/login/failed",
    failureFlash: true,
    successFlash: "Successfully logged in!",
}));

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(port);
})