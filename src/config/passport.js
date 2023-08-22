import passport from "passport"
import { Strategy as localStrategy } from 'passport-local'
import User from "../models/User.js"

passport.use(new localStrategy({
  usernameField: 'email'
}, async (email, password, done) => {
  const user = await User.findOne({ email })
  if (!user) {
    return done(null, false, { message: 'Incorrect credentials' })
  } else {
    const match = await user.matchPassword(password)
    if (match) {
      return done(null, user)
    } else {
      return done(null, false, { message: 'Incorrect credentials' })
    }
  }
}))

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).lean()
    done(null, user)
  } catch (error) {
    done(error, false)
  }
})


