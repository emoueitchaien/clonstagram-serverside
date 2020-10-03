const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const bcrypt = require('bcryptjs')
const User = mongoose.model('User')
const jwt = require('jsonwebtoken')
const {jwtSecret} = require('../key')
const requireLogin = require('../middlewares/requireLogin')

router.get('/',(req,res)=>{
    res.send("Hello there")
})

router.get('/protected', requireLogin, (req,res)=>{
    res.send("You are allowed to access this resource!")
})

router.post('/signup',(req,res)=>{
    const {name, email, pass} = req.body
    if (!name||!email||!pass){
        return res.status(422).json({error:"Please fill up all input fields"})
    }
    User.findOne({email:email})
        .then((savedUser)=>{
            if(savedUser){
                return res.status(422).json({error:"User already exists!"})   
            }
            bcrypt.hash(pass,15)
                .then(hashedpass=>{
                    const user = new User({
                        name,
                        email,
                        pass:hashedpass
                    })
                    user.save()
                        .then(user=>{
                            res.json({message:"User SignUp Successful!"})
                        })
                        .catch(err=>{
                            console.log(err)
                        })
                    })
                })
        .catch(err=>{
                console.log(err)
            })
})

router.post('/signin',(req,res)=>{
    const {email, pass} = req.body
    if(!email || !pass){
        return res.status(422).json({error:"Please fill up all details!"})
    }
    User.findOne({email:email})
        .then(savedUser=>{
            if(!savedUser){
                return res.status(422).json({error:"Incorrect Details!"})
            }
            bcrypt.compare(pass,savedUser.pass)
                .then(match=>{
                    if(match){
                    //    res.json({message:"SignIn Successful!"})
                        const token = jwt.sign({_id:savedUser._id},jwtSecret)
                        res.json({token})
                    }
                    else{
                        res.status(422).json({error:"Incorrect Details!"})
                    }
                })
                .catch(error=>{
                    console.log(error)
                })
        })
})

module.exports = router
