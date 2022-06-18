const { Admin } = require("../models");
const passport = require("../lib/passport");

module.exports = {
  register: async (req, res, next) => {
    // Kita panggil static method register yang sudah kita buat tadi
    try {
      await Admin.register(req.body);
      res.redirect("/login");
    } catch (err) {
      next(err);
    }
  },

  login: passport.authenticate("local", {
    successRedirect: "/admin",
    failureRedirect: "/login",
    failureFlash: true, // Untuk mengaktifkan express flash
  }),


};