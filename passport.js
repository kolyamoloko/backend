import passport from 'passport';
import { Strategy as Github } from 'passport-github2';
import { Strategy as Google } from 'passport-google-oauth20';
import User from './models/User.js';

const GoogleStrategy = Google.Strategy;
const GitHubStrategy = Github.Strategy;
const GITHUB_CLIENT_ID = "2eccc3bd3e3813c2e9be"
const GITHUB_CLIENT_SECRET = "d5a9a4ae51c5e4676ee8c9a42e61a0b980b20e6a"
const GOOGLE_CLIENT_ID = "597192839397-vacsrmg2uoc1g4kg7au04auidihiq4hf.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "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"

passport.use(new GitHubStrategy({
  clientID: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
  callbackURL: "https://backend-production-3201.up.railway.app/auth/github/callback"
},
async (accessToken, refreshToken, profile, done) => {
  await (console.log("user profile is:", profile))
}
));

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "https://backend-production-3201.up.railway.app/auth/google/callback"
},
  async (accessToken, refreshToken, profile, done)=>{
    await console.log("user profile is:", profile)
  }
));

passport.serializeUser((user,done)=>{
  done(null,user)
})

passport.deserializeUser((user,done)=>{
  done(null,user)
})
export default passport;