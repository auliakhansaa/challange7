const { User, History } = require("../models");

module.exports = {
  loginpage: (req, res) => {
    res.render("pages/login/login", { layout: "layouts/login" });
  },

  dashboard: async (req, res) => {
    const userdata = await User.findAll();
    const jumlahUser = userdata.length;
    const recentGame = await History.findAll();

    res.render("pages/home/index", { jumlahUser, recentGame });
  },
};
