const jwt = require('jsonwebtoken');
const login = require('../models/user');
const { use } = require('../routes/login');


const auth = async (req,res,next)=>{
    try {
        const token = req.cookies.jwt;
        const verifyuser = jwt.verify(token,process.env.SECRET_KEY);
        const user = await login.findOne({_id:verifyuser._id});
        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        res.status(401).send(error)
    }
}

module.exports = auth;
