const {Schema, model } = require("mongoose");

const AccountSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: "walletUser",
        required:true
    },
    balance:{
        type:Number,
        required:true,
    },
    transactions:[{
        type:String
    }]
})

const Account = model("walletAccount",AccountSchema);

module.exports=Account;