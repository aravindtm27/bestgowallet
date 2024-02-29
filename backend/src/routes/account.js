const {Router} = require("express");
const User = require("../models/User.js");
const Account = require("../models/db.js");
const { authMiddleware } = require("../middleware/middleware.js");
const { default: mongoose } = require("mongoose");

const router = Router();

router.get("/balance",authMiddleware, async(req,res)=>{
   try{
    const username = req.username; 

    let user = await User.findOne({username:username});

    let account = await Account.findOne({userId: user._id})

    res.json({
        username: user.firstName,
        balance: account.balance,
        transactions: account.transactions,
    })
   }catch(err){
    res.status(403).json({
        message: err
    })
   }
   
    
});

router.post("/transfer", authMiddleware,async(req,res)=>{
    const {to, amt} = req.body;

    
    const amount = Number(amt);

    console.log('this is the transfer amount',amount);

    const session = await mongoose.startSession();
    session.startTransaction();

    let toUser = await User.findOne({username:to});
    let fromUser = await User.findOne({username: req.username});

    let fromUserBalance = await Account.findOne({userId:fromUser._id});
    if(fromUserBalance.balance<amount){
        return res.status(400).json({
            message:"Insufficient funds"
        })
    }

    let toAccount = await Account.findOneAndUpdate({userId: toUser._id}, 
                                                    {$inc:{balance: amount},$push:{transactions: `${fromUser.username} sent you ${amount}`}});
    let fromAccount = await Account.findOneAndUpdate({userId: fromUser._id},
                                                     {$inc:{balance: -amount},$push:{transactions: `You sent ${toUser.username} ${amount}`}});

    toAccount.save();
    fromAccount.save();

    await session.commitTransaction();

    res.json({
        balance:fromAccount.balance,
        transactions: fromAccount.transactions
    })

})

router.get('/transactions',authMiddleware, async(req,res)=>{

})

module.exports = router;