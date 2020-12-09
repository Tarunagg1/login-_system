const router = require('express').Router();
const login = require('../models/user')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

router.get('/',(req,res)=>{
    res.render('login')
})

router.post('/', async (req,res)=>{
    try {
        const email = req.body.email;
        const password = req.body.password;
        const emaildata = await login.findOne({email});
        if(emaildata){
            const ismatch = await bcrypt.compare(password,emaildata.password);
            if(ismatch){
                const token = await emaildata.genrateauttoken();
                res.cookie('jwt',token,{
                    expires:new Date(Date.now() + 900000000),
                    httpOnly:true
                });
                res.render('index');
            }else{
                res.status(401).send("Password is not");
            }
        }else{
            res.status(404).send("email id not exist");
        }
    } catch (error) {
        res.status(400).send("server error");
    }
})


module.exports = router;

