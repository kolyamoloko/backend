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

const addGoogleUser = (User) => ({
  id, email, firstName, lastName, profilePhoto
}) => {
  const user = new User({
      id, email, firstName, lastName, profilePhoto, source: "google"
  })
  return user.save();
}
const getUsers = (User) => () => {
  return User.find({})
}
const getUserByEmail = (User) => async({ email }) => {
  return await User.findOne({ email })
}

const addGithubUser = (User) => ({
  id, email, firstName, lastName, profilePhoto
}) => {
  const user = new User({
      id, email, firstName, lastName, profilePhoto, source: "github"
  })
  return user.save();
}

passport.use(new GitHubStrategy({
  clientID: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
  callbackURL: "https://backend-production-3201.up.railway.app/auth/github/callback"
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

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "https://backend-production-3201.up.railway.app/auth/google/callback"
},
  async (accessToken, refreshToken, profile, done)=>{
    const id = profile.id;
    const email = profile.emails[0].value;
    const firstName = profile.name.given_name;
    const lastName = profile.name.family_name;
    const profilePhoto = profile.photos[0].value;
    const source = "google";
    const currentUser = await getUserByEmail({ email });
    if(!currentUser) {
      const newUser = await addGoogleUser({
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

passport.serializeUser((user,done)=>{
  done(null,user.id)
})

passport.deserializeUser(async (id,done)=>{
  const currentUser = await User.findOne({ id });
  done(null, currentUser)
})

export default passport;