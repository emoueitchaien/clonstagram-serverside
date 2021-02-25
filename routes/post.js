const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin = require('../middlewares/requireLogin')
const Post = mongoose.model('Post')

router.post('/createpost', requireLogin, (req,res)=>{
    const {caption,photo} = req.body
    if(!caption||!photo){
        res.status(422).json({error:"Please fill all details!!"})
    }
    
   // console.log(req.user)
    req.user.pass = undefined
    //res.send("Done")

    const post = new Post({
        // title,
        caption,
        photo,
        postedBy : req.user
    })

    post.save()
        .then(result=>{
            res.json({post:result})
        })
        .catch(err=>{
            console.log(err)
        })
})

router.get('/allposts',(req,res)=>{
    Post.find()
        .populate("postedBy","_id name")
        .then(posts=>{
            res.json({posts})
        })
        .catch(err=>{
            console.log(err)
        })
})

router.get('/myposts', requireLogin, (req,res)=>{
    Post.find({postedBy:req.user._id})
        .populate("postedBy","_id name")
        .then(posts=>{
            res.json({posts})
        })
        .catch(err=>{
            console.log(err)
        })
})

module.exports = router
