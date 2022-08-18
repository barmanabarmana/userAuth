const express = require('express');
const bodyParser = require('body-parser');
const User = require("../schema/userSchema");
const authController = require("../controllers/authController");
const userAuthRouter = express.Router();
const jwt = require("../middleware/jwt");
const authMiddleware = require("../middleware/authMiddleware");
const cors = require("../middleware/cors");


userAuthRouter.use(bodyParser.json());

userAuthRouter.get('/',cors.corsWithOptions,authMiddleware,authController.getAllUsers)
userAuthRouter.post('/register',cors.corsWithOptions,authController.registration)
userAuthRouter.post('/login',cors.corsWithOptions,authController.login)


module.exports = userAuthRouter;

