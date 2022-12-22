require("dotenv").config()
const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const UserService = require('../user');

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL
  },
  async (accessToken, refreshToken, profile, done) => {
    const id = profile.id;
    const email = profile.profileUrl;
    const firstName = profile.displayName;
    const lastName = profile.userName;
    const profilePhoto = profile.photos[0].value;
    const source = "github";
    const currentUser = await getUserByEmail({ email });
    if(!currentUser) {
      const newUser = await addGithubUser({
        id,
        email,
        firstName,
        lastName,
        profilePhoto
      })
      return done(null, newUser);
    }
    currentUser.lastVisited = new Date();
    return done(null, currentUser);
  }
  ));