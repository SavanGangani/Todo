const router = require('express').Router();
const User = require('../moduls/User');

router.get("/:id", async(req, res)=>{
    try {
        const user = await User.findById(
            req.params.id
        );
        res.status(200).json(user);
    } catch (error) {
        
    }
})


router.get("/", async(req, res)=>{
    try {
        const user = await User.find();
        res.status(200).json(user)
    } catch (error) {
        
    }
})

module.exports = router;
