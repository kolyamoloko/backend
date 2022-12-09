const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const GITHUB_CLIENT_ID = "2eccc3bd3e3813c2e9be"
const GITHUB_CLIENT_SECRET = "d5a9a4ae51c5e4676ee8c9a42e61a0b980b20e6a"
const GOOGLE_CLIENT_ID = "597192839397-vacsrmg2uoc1g4kg7au04auidihiq4hf.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "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"


passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ githubId: profile.id, avatar: profile.photos[0] }, function (err, user) {
      return done(err, user);
    });
  }
));

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "auth/google/callback"
},
function(accessToken, refreshToken, profile, cb) {
  User.findOrCreate({ googleId: profile.id }, function (err, user) {
    return cb(err, user);
  });
}
));

passport.serializeUser((user,done)=>{
    done(null,user)
})

passport.deserializeUser((user,done)=>{
  done(null,user)
})