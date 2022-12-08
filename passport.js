const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

const GITHUB_CLIENT_ID = "2eccc3bd3e3813c2e9be"
const GITHUB_CLIENT_SECRET = "d5a9a4ae51c5e4676ee8c9a42e61a0b980b20e6a"


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

passport.serializeUser((user,done)=>{
    done(null,user)
})

