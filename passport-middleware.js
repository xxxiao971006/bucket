const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const database = require("./fake-db");

const localLogin = new LocalStrategy(
  (username, password, done) => {
    const user = database.getUserByUsernameAndPassword(username, password);
    return user
      ? done(null, user)
      : done(null, false, {
          message: "Your login details are not valid. Please try again",
        });
  }
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
  // Create a session for the user
  // Creates a special variable for us called req.user
});

passport.deserializeUser(function (id, done) {
  let user = database.getUserByUserId(id);
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found" }, null);
  }
});

module.exports = passport.use(localLogin);
