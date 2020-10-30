const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth = require("../listeners/auth");

router.get("/test", (req, res) => {
    res.send("aha");
});

router.post("/register", async (req, res) => {
    try {
        const {email, password, passwordCheck} = req.body;
        if (!email || !password || !passwordCheck){
            return res.status(400).json({msg: "Bad input"});
        }
        if (password !== passwordCheck){
            return res.status(400).json({msg: "Password not matching"});
        }

        const existingUser = await User.findOne({email:email});

        if (existingUser){
            return res.status(400).json({msg: "Account exists"});
        }

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            email:email,
            password:passwordHash
        });
        
        const createdUser = await newUser.save();

        return res.status(200).json({
            msg: "user created",
            user: createdUser
        });
    
    } catch (err) {
        res.status(500).json(err.stack);
    }
});

router.post("/login", async (req, res) => {
    try {
        const {email, password} =  req.body;
        if (!email || !password){
            return res.status(400).json({msg: "Bad input"});
        }

        const sbuser = await User.findOne({email:email});
        
        if (!sbuser){
            return res.status(400).json({msg: "Can't find account"});
        }

        const isMatch = await bcrypt.compare(password, sbuser.password);
        
        if (!isMatch) return res.status(400).json({msg: "Bad password"});

        const token = jwt.sign({id:sbuser._id}, process.env.JWT_SECRET);
        
        return res.status(200).json({
            token: token,
            user: {
                id: sbuser._id,
                email: sbuser.email
            }
        });

    } catch (error) {
        console.log(error);
    }
});

router.delete("/delete", auth, async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.user);

        return res.status(200).json(deletedUser);
    } catch (error) {
        
    }
});

router.post("/tokenValid", async (req, res) => {
    try {
        const token = req.header("X-Auth-Token");

        if (!token){
            return res.status(200).json(false);
        }

        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
        if (!verifiedToken)return res.status(200).json(false);

        const user =  await User.findById(verifiedToken.id);
        if (!user) return res.status(200).json(false);
        
        return res.status(200).json(true);
    } catch (error) {
        return res.status(500).json({error:error.message});
    }
});

router.get("/", auth, async (req, res) => {
    try {

        const user =  await User.findById(req.user);
        if (!user) return res.status(200).json(false);
        
        return res.status(200).json({
            id:user._id
        });
    } catch (error) {
        return res.status(500).json({error:error.message});
    }
});


module.exports = router;