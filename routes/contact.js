const express = require("express")
const router = express.Router();
const usercontact = require('../models/contact')

router.post('/', async(req,res)=>{
    try {
        const newquery = new usercontact(req.body);
        const res = await newquery.save();
        res.status(201).render("index");
    } catch (error) {
        res.status(500).send(error);
    }
})

router.get('/',async(req,res)=>{
    try {
        const data = await usercontact.find();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send(error)
    }
})


module.exports = router;
