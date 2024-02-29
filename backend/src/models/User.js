const {Schema, model }= require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    firstName:{
        type: String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    password_hash:{
        type:String,
        required:true,
    }
},{timestamps:true});

UserSchema.methods.createHash = async function (plainTextPassword) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(plainTextPassword, salt);
  };
  
UserSchema.methods.validatePassword = async function(inputpassword){
    return await bcrypt.compare(inputpassword,this.password_hash)
}

const User = model("walletUser", UserSchema);

module.exports = User