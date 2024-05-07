const mongoose=require('mongoose')


const User=mongoose.Schema({
    first_name:{type:String,required:true},
    lastname_name:String,
    password:{type:String ,required:true},
    email:{type:String,required:true,unique:true},
    gender:{
        type:String,
        enum:["male","female","other"],
        default:"other"

    },
    profile:{type:String,required:true}
})

const Usermodel=mongoose.model("UserData",User)

module.exports=Usermodel