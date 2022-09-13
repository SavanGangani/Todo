const router = require('express').Router();
const User = require("../moduls/User");
const Cryptojs = require('crypto-js');
const dotenv = require('dotenv');

dotenv.config();

var emailExists;
//REGISTER 

router.post("/register", async (req, res)=>{

    const newUser = new User({
        username : req.body.username,
        email : req.body.email,
        password : Cryptojs.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
    });
    try {
        const savedUser = await newUser.save();
        res.status(200).send("Account created");
    } catch (error) {
        res.status(501).json(error);
    }
});


//LOGIN

router.post("/login", async(req, res)=>{
    try {
        const user = await User.findOne({email: req.body.email});
        !user && res.status(401).json("Please enter valid user Name");

        const hashesPassword = Cryptojs.AES.decrypt(user.password, process.env.PASS_SEC);
       
        const originalPassword = hashesPassword.toString(Cryptojs.enc.Utf8);
       
        originalPassword !== req.body.password && res.status(401).json("PLEASE ENTER VALID PASSWORD");

        const { password, ...others} = user._doc;

        res.status(200).json(others);

    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;
