const router = require('express').Router(),
    User = require('../models/userModel'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt');

router.post("/login", async(req,res)=>{
    //email, password from frontend
    //frontend form, hope to add react-dropzone
    const {email, password} = req.body;

    try{
        //Check email
        const existingUser = await User.findOne({email});

        if(!existingUser) return res.status(404).json({message:"User doesn't exist"})

        //Check password
        const isPasswordCorrect = await bcrypt.compare(password,existingUser.password)

        if(!isPasswordCorrect) return res.status(404).json({message:"Wrong Password!"})

        const token = jwt.sign({email:existingUser.email, id:existingUser._id}, process.env.SECRET,{expiresIn:'30m'})

        res.status(200).json({result:existingUser, token})
    }catch(e){
        res.status(500).json({message: "something went south"})
    }
})

router.post("/signup", async(req,res)=>{
    //frontend form
    const {name, email, password, confirmPassword} = req.body;

    try {
        //Check if email exist or not
        const existingUser = await User.findOne({email});

        if(existingUser) return res.status(400).json({message:"Email already exist!"})

        //Compare pw
        if(password!==confirmPassword) return res.status(400).json({message:"Password doesn't match!"})

        //Hashing^^
        const hashedPassword = await bcrypt.hash(password, 10),
            result = await User.create({email, password:hashedPassword, name});
            token = jwt.sign({ email: result.email, id: result._id}, process.env.SECRET, {expiresIn:'1h'})

        res.status(200).json({result,token})
    } catch (e) {
        res.status(500).json({message: "something went south"})
    }
})

module.exports = router;