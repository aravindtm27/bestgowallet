const {Router} = require("express");
const zod = require("zod");
const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const { JWT_SECRETS } = require("../../config.js");
const Account = require("../models/db.js");
 
const router = Router();

const signUpBody = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName:  zod.string(),
    password: zod.string().min(8)
}).superRefine(({password})=>{
    const containsUpperCase = (ch)=>/[A-Z]/.test(ch);
    const containsLowerCase = (ch)=>/[a-z]/.test(ch);

    let countOfUpperCase = 0;
    let countOfLowerCase = 0;
    let countOfNumbers = 0;
    for(let i =0; i<password.length;i++){
        let ch = password.charAt(i);

        if(!isNaN(+ch)) countOfNumbers++;
        else if(containsUpperCase(ch)) countOfUpperCase++;
        else if(containsLowerCase(ch)) countOfLowerCase++;
    }
    if(
        countOfLowerCase<1||
        countOfNumbers<1||
        countOfUpperCase<1
        ){
            throw new Error('password does not match the requirements');
        }
})

router.post("/signup", async(req,res)=>{
    const {username, firstName, lastName, password} = req.body;
    const user = await User.findOne({username});
    if(user) res.json({message:"user already exists"});
    else{try{
        if(signUpBody.parse({
            username,
            firstName,
            lastName,
            password
        })
        ){
            const newUser = new User({
                username: username,
                firstName: firstName,
                lastName: lastName,
            })

            let password_hash = await newUser.createHash(password);
            newUser.password_hash = password_hash;

            const newAccount = new Account({
                userId: newUser._id,
                balance: Math.floor(Math.random()*100001),
            })

            const token = jwt.sign({
                username
            },JWT_SECRETS);

            newUser.save();
            newAccount.save();

            res.json({
                message:"user created",
                token: token,
                balance: newAccount.balance,
            })

        }else{
            throw new Error("Invalid credentials");
        }
    }catch{
        res.json({
            message:"Invalid Credentials"
        })
    }
    }
})

router.post("/signin", async(req,res)=>{
    const{username, password} = req.body;
    
    let user = await User.findOne({username: username})

    if(user === null){
        return res.status(400).json({
            message:"user not found"
        })
    }else{
       if( await user.validatePassword(password)){

        const token = jwt.sign({
            username: username
        }, JWT_SECRETS)

        return res.json({
            token: token
        })
       }else{
        return res.json({
            message:"wrong password"
        })
       }
    }

})

module.exports = router;