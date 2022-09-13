const router = require('express').Router();
const Data = require('../moduls/DataSchema');


router.post("/uploadData/:id", async (req, res)=>{
    const dataUpload = new Data({
        userId: req.params.id,
        title: req.body.title,
        data: req.body.data
    });
  try {
    const saveData = await dataUpload.save();
    res.status(200).json(saveData);
  } catch (error) {
    res.status(401).json(error)
  }
});

router.get("/data/:userId", async(req, res)=>{
    try {
        const user = await Data.find(
            {
                "$or":[
                    {"userId": {$regex: req.params.userId}}
                ]
            }
        );
        res.status(200).json(user);
    } catch (error) {
        res.status(401).json(error);
    }
})

module.exports = router;