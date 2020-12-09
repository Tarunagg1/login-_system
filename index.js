require('dotenv').config();
const express = require('express')
const app = express();
const db = require('./db/db')
const path = require('path')
const hbs = require('hbs')
const contactus = require('./routes/contact')
const login = require('./routes/login')
const registration = require('./routes/registration')
const jwt = require('jsonwebtoken')
const cookie_parser = require('cookie-parser')
const PORT = process.env.PORT || 3000
const auth = require('./auth/auth')

const staticpath = path.join(__dirname,'./public');
const templatepath = path.join(__dirname,'./templates/views');
const partialspath = path.join(__dirname,'./templates/partials');

// middleware
app.use(express.static(staticpath))
app.use(cookie_parser());
app.set("view engine","hbs");
app.set("views",templatepath);
hbs.registerPartials(partialspath);
app.use(express.urlencoded({extended:false}))


app.get('/',(req,res)=>{
    res.render('index')
})

app.get('/secret',auth,(req,res)=>{
    res.render('secretpage')
})

app.get('/logout',auth,async(req,res)=>{
    try {
        req.user.tokens = req.user.tokens.filter((currentele)=>{
            console.log(currentele.token);
              return currentele.token != req.token
          });
          res.clearCookie('jwt');
          await req.user.save();
          res.status(200).render('index');  
    } catch (error) {
        res.status(500).send(error)
    }
})

app.get('/logoutalldevice',auth, async(req,res)=>{
    try {
        req.user.tokens = [];
        res.clearCookie('jwt');
        await req.user.save();
        res.status(200).render('index');  
  } catch (error) {
      res.status(500).send(error)
  }
})

app.use('/contact',contactus);
app.use('/login',login);
app.use('/registration',registration);

app.listen(PORT,()=>{
    console.log("Server listen at "+PORT);
})

