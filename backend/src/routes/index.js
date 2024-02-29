const {Router} = require("express");
const { authMiddleware } = require("../middleware/middleware.js");
const zod = require("zod");
const User = require("../models/User.js");

const router = Router();

const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
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

router.get("/users",async(req,res)=>{
    try{
        const filter = req.headers.search || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
    }catch(err){
        res.status(404).json({
            message:"Couldn't find user"
        })
    }
})

router.put("/update", authMiddleware,async(req,res)=>{
    const {success} = updateBody.safeParse(req.body)
    if(!success){
        res.status(411).json({
            message:"Error while updating information"
        })
    }

    await User.updateOne({username:req.username},req.body);

    res.json({
        message:"update successfull"
    })
})


module.exports = router;

