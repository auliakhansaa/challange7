const {  Admin, User } = require("../models");
const bcrypt = require("bcrypt");

module.exports = {
  index: (req, res) => {
    User.findAll({
      order: [["id", "ASC"]],
    }).then((usergames) => {
      res.render("pages/admin/index", {
        pageTitle: "Daftar User",
        usergames,
      });
    });
  },


  create: (req, res) => {
    res.render("pages/admin/create");
  },

  store: async (req, res, next) => {
    try {
      const encryptedPassword = await bcrypt.hash(req.body.password, 10);
      const userGame = await PlayerUser.create({
        username: req.body.username,
        email: req.body.email,
        password: encryptedPassword,
      });
      await PlayerUserBiodata.create({
        playerUserId: userGame.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
      });
      res.redirect("/admin");
    } catch (err) {
      next(err);
    }
  },

  
  show: async (req, res) => {
    const { id } = req.params;
    const detail = await PlayerUser.findOne({
      where: {
        id: id,
      },
      include: "PlayerUserBiodata",
    });
    res.render("pages/admin/show", {
      pageTitle: `${PlayerUser.username} Data`,
      detail,
    });
  },

  editUser: async (req, res) => {
    const usergame = await User.findOne({
      where: { id: req.params.id },
      include: "PlayerUserBiodata",
    });
    res.render("pages/admin/edit", {
      pageTitle: "Edit User",
      usergame,
    });
  },
};
