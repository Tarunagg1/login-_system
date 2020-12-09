const router = require('express').Router();
const register = require('../models/user')
const bcryptjs = require('bcryptjs');

router.get('/',(req,res)=>{
    res.render('registration')
})

router.post('/',async (req,res)=>{
    try {
        if(req.body.password == req.body.confirmpass){
            const newuser = new register(req.body);
            // const token = await newuser.genrateauttoken();
            // console.log(token);
            // res.cookie('jwt',token);
            const res = await newuser.save();
            res.status(200).render('login');
        }else{
            res.send("password not match")
        }
    } catch (error) {
        res.status(400).send(error);
    }
})

module.exports = router;

