const express = require('express');
const bodyParser = require('body-parser');
const User = require("../schema/userSchema");
const authController = require("../controllers/authController");
const userAuthRouter = express.Router();
const jwt = require("../middleware/jwt");
const authMiddleware = require("../middleware/authMiddleware");


userAuthRouter.use(bodyParser.json());

userAuthRouter.get('/',authMiddleware,authController.getAllUsers)
userAuthRouter.post('/register',authController.registration)
userAuthRouter.post('/login',authController.login)


module.exports = userAuthRouter;

