import express from "express";
import passport from "passport";
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
});

router.get("/logout", (req,res)=>{
    req.logout();
    res.redirect(CLIENT_URL);
});

router.get("/login/failed", (req,res)=> {
    res.status(401).json({
        success: false,
        message: "failure",
    });
});

router.get("/github", passport.authenticate("github", {scope:[
    "profile"
]}));

router.get("/github/callback",
    passport.authenticate("github", {
    successRedirect: CLIENT_URL,
    failureRedirect: SERVER_URL + "login/failed",
}));

router.get("/google", passport.authenticate("google", {scope:[
    "profile"
]}));

router.get("/google/callback",
    passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: SERVER_URL + "login/failed",
}));
export default router;