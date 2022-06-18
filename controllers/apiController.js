const { User } = require("../models");
const bcrypt = require("bcrypt");

module.exports = {
  register: async (req, res) => {
    try {
      const encryptedPassword = await bcrypt.hash(req.body.password, 10);
      const user = await User.create({
        username: req.body.username,
        password: encryptedPassword,
      });
      res.json(user);
    } catch (err) {
      res.json({ error: err.message });
    }
  },

  login: async (req, res) => {
    console.log(req.body);
    const user = await User.authenticate(req.body);
    const { id, username } = user;
    res.json({
      id,
      username,
      accessToken: user.generateToken(),
    });
  },

  index: async (req, res) => {
    const data = await User.findAll();
    res.status(200).json(data);
  },
};
