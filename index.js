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

const PORT = process.env.PORT || 3000

const staticpath = path.join(__dirname,'./public');
const templatepath = path.join(__dirname,'./templates/views');
const partialspath = path.join(__dirname,'./templates/partials');

// middleware
app.use(express.static(staticpath))

app.set("view engine","hbs");
app.set("views",templatepath);
hbs.registerPartials(partialspath);
app.use(express.urlencoded({extended:false}))

app.get('/',(req,res)=>{
    res.render('index')
})

app.use('/contact',contactus);
app.use('/login',login);
app.use('/registration',registration);

app.listen(PORT,()=>{
    console.log("Server listen at "+PORT);
})

