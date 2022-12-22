import express from "express";
import passport from "../passport.js";
import jwt from "jsonwebtoken";
import UserModel from '../models/User.js';

const CLIENT_URL = "https://all-movie-reviews.netlify.app/"
const SERVER_URL = "https://backend-production-3201.up.railway.app/"

const router = express.Router();

router.get("/", (req, res) => {
    res.send('Hello World!');
})
router.get("/login/success", (req,res)=> {
    if(req.user){
        res.status(200).json({
            success: true,
            message: "successfull",
            user: req.user,
        })
    };
    console.log('ok')
});

router.get("/logout", (req,res)=>{
    req.session.destroy(function () {
        res.clearCookie("connect.sid");
        res.redirect("/auth");
      });
});

router.get("/login/failed", (req,res)=> {
    res.status(401).json({
        success: false,
        message: "failure",
    });
});

router.get("/github", passport.authenticate('github', {scope:[
    "profile", "email"
]}));

router.get("/github/callback",
    passport.authenticate("github", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
    failureFlash: true,
    successFlash: "Successfully logged in!",
}));

router.get("/google", passport.authenticate('google', {
    scope:["profile", "email"],}));

router.get("/google/callback",
    passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
    failureFlash: true,
    successFlash: "Successfully logged in!",
}));
export default router;