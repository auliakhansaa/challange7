const express = require("express");
const pagesController = require("../controllers/pagesController");
const userGameController = require("../controllers/userGameController");
const authController = require("../controllers/authController");
const apiController = require("../controllers/apiController");
const restrict = require("../middlewares/restrict");
const restrictUser = require("../middlewares/restrictUser");
const gameController = require("../controllers/gameController");
const router = express.Router();

// API
router.post("/api/v1/auth/register", apiController.register);
router.post("/api/v1/auth/login", apiController.login);
router.get("/api/v1/user", restrictUser, apiController.index);


// Homepage
router.get("/", (req, res) => res.render("pages/admin/create"));

// Register Page
router.get("/register", (req, res) => res.render("pages/admin/create"));
router.post("/register", authController.register);

router.get("/admin", pagesController.dashboard);
router.get("/admin/create", userGameController.create);
router.get("/admin/user", userGameController.index);


// Game
router.post("/game/create-room", restrictUser, gameController.createRoom);
router.post("/game/room/:id", restrictUser, gameController.playGame);

module.exports = router;
