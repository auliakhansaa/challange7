const { Admin, User } = require("../models");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");

async function authenticate(username, password, done) {
  try {
    const user = await Admin.authenticate({ username, password });
    return done(null, user);
  } catch (err) {
    return done(null, false, { message: err.message });
  }
}

const options = {
   jwtFromRequest: ExtractJwt.fromHeader("authorization"),

  secretOrKey: "inirahasia",
};

passport.use(
  new JwtStrategy(options, async (payload, done) => {
    // payload adalah hasil terjemahan JWT, sesuai dengan apa yang kita masukkan di parameter pertama dari jwt.sign
    User.findByPk(payload.id)
      .then((user) => done(null, user))
      .catch((err) => done(err, false));
  })
);

passport.use(new LocalStrategy({ usernameField: "username", passwordField: "password" }, authenticate));

/* Serialize dan Deserialize
   Cara untuk membuat sesi dan menghapus sesi
 */
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => done(null, await Admin.findByPk(id)));

// Kita exports karena akan kita gunakan sebagai middleware
module.exports = passport;
