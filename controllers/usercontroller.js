
const router = require('express').Router();
const User= require('../db').import('../models/user')

const jwt= require('jsonwebtoken');
const bcrypt= require('bcryptjs');

router.post('/signup', (req, res) =>{
    User.create({
        email:req.body.email,
        password: bcrypt.hashSync(req.body.password, 12)
 
    })
    .then(user =>{
        const token = jwt.sign({id:user.id}, process.env.JWT_SECRET, {expiresIn: "7d"})
 
    
        res.json({
            user:user,
            message:"user was created successfully",
            sessionToken: token
        })
    })
    .catch(err => res.status(500).send(err))
})

module.exports=router