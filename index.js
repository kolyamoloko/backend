import express from "express";
import cookieSession from "cookie-session";
import * as passportConfig from "./passport.js"
import passport from "passport";
import cors from "cors";
import router from "./routes/auth.js";
import mongoose from 'mongoose';
import {MongoClient, ServerApiVersion} from 'mongodb';
import flash from 'connect-flash';

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
        serverApi: ServerApiVersion.v1 
    },
    )
const app = express();
const authRoute = router;

app.use(cookieSession(
    {
        name: "session",
        keys:["mikalainovikau"],
        maxAge: 86400000
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
const port = process.env.PORT || 5000;

app.use("/auth", authRoute);
app.listen(port, () => {
    console.log(port);
})
console.log()