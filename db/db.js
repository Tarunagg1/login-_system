const mongoose = require('mongoose')

mongoose.connect(process.env.DB_HOST,{useCreateIndex:true,useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
    console.log('database connected');
}).catch(()=>{
    console.log('database not connected');
})

