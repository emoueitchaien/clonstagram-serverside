const jwt = require('jsonwebtoken')
const {jwtSecret} = require('../key')
const mongoose = require('mongoose')
const User = mongoose.model('User')

module.exports = (req,res,next) =>{
    const {authorization} = req.headers
    if(!authorization){
        return res.status(401).json({error:"Please login first"})
    }
    const token = authorization.replace('Bearer ','')
    jwt.verify(token,jwtSecret,(err, payload)=>{
        if(err){
            return res.status(401).json({error:"Please login first"})
        }

        const {_id} = payload
        User.findById(_id)
            .then(userdata =>{
                    req.user = userdata
                    next()
            })

    })
}
