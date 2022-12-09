const express = require("express");
const cookieSession = require("cookie-session");
const passportSetup = require("./passport");
const passport = require("passport");
const cors = require("cors");
const authRoute = require("./routes/auth")
const app = express();


app.use(cookieSession(
    {
        name: "session",
        keys:["lama"],
        maxAge: 86400000
    }
))
app.use(passport.initialize());
app.use(passport.session());
app.use(
    cors({
        origin:"https://all-movie-reviews.netlify.app/",
        methods:"GET,POST,PUT,DELETE",
        credentials: true,
    })
)
const port = process.env.PORT;

app.use("/auth", authRoute);

app.listen(port, () => {
    console.log(port);
})
