const mongoose = require('mongoose')
const validator = require('validator')

const contactusschema  = mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength:2
    },
    email:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid email id")
            }
        }
    },
    phone:{
        type:Number,
        required:true,
        min:10
    },
    message:{
        type:String,
        required:true,
        minLength:2
    },
    data:{
        type:Date,
        default:Date.now()
    }

})

const userscontact = mongoose.model('contactus',contactusschema);
module.exports = userscontact;