const User = require("../schema/userSchema")
const Role = require("../schema/roleSchema")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtMiddleware =  require('../middleware/jwt');

class authController {
    async registration(req,res) {
        try {
            const { username,password } = req.body;
            if(username.length < 8 || username.length > 30) {
                return res.status(400).json({message: "Username must contain 8 to 30 characters"});
            }
            if(password.length < 8) {
                return res.status(400).json({message: "Password must contain minimum 8 characters"});
            }

            const candidate = await User.findOne({username});
            if(candidate) {
                return res.status(400).json({message: "User with this username already exist"});
            }
            const userRole = await Role.findOne({value: 'User'})
            bcrypt.hash(password, 7, async (err, hash) => {
                if (err) {
                    return res.status(400).json({message: err});
                }
                if (hash) {
                    const user = new User({username, password: hash, roles: [userRole.value]});
                    await user.save();
                }
            });
            return res.json({message: "You Registered Successfully"});
        }catch (e) {
            console.log(e);
            res.status(400).json({message: 'Registration Error'});
        }
    }
    async login(req,res) {
        try {
            const {username, password } = req.body;
            const user = await User.findOne({username});
            if(!user) {
                return res.status(400).json({message: "User with this username doesnt exist"});
            }
            const validPassword = await bcrypt.compare(password,user.password);
            if(!validPassword) {
                return res.status(400).json({message: "Username or password is incorrect"});
            }
            const token = jwtMiddleware.getToken(user._id,user.username);
            
            return res.json({token})

        }catch (e) {
            console.log(e)
            res.status(400).json({message: 'Login Error'});
        }
    }

    async getAllUsers(req,res) {
        try {
            const users = await User.find({});
            if(!users) {
                res.json("There are no users in database")
            }
            res.json({users});
            res.json("Working");
        }catch (e) {
            console.log(e)
        }
    }
}

module.exports = new authController();
