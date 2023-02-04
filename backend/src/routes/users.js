const express = require('express');
const Request = require('../models/Request');
const User = require('../models/User');
const mongoose = require('mongoose');
const authentication = require('../middleware/auth');



const userRouter = new express.Router();

userRouter.post('/users/login',async function(req,res){
    const identification = req.body.identification;
    const password = req.body.password;
    const requiredFields = ['name','email','identification','phone'];
    try {
        const foundUser = await User.findByCredentials(identification,password);
        const token = await foundUser.generateToken();
        const reducedDetails = Object.fromEntries(requiredFields.map((field)=>[field,foundUser[field]]));
        // res.setHeader('Access-Control-Allow-Origin','https://travel-buddy-frontend.onrender.com');
        // res.setHeader('Access-Control-Allow-Credentials','true');
        res.send({user:reducedDetails,token,expiresIn:parseInt(process.env.JWT_EXPIRES_IN)});
    } catch (error) {
        res.send({error:"No such User Found!"});
    }
});

userRouter.post('/users',async function(req,res){
    const user = {
        _id: new mongoose.Types.ObjectId(),
        name:req.body.name,
        password:req.body.password,
        email:req.body.email,
        identification:req.body.identification,
        phone:req.body.phone
    };
    const newUser = new User(user);
    try {
        await newUser.save();
        res.json({message:"Successfully Registered"});
    } catch (error) {
        console.log(error);
        res.status(404).json({error});
    }
});
userRouter.get('/users/logout',authentication,async function(req, res){
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
          return token.token !== req.token; //filtering out all the unused token
        });//Frontend logic has to be added to slash the existing token out of the request
        await req.user.save();
        res.status(200).json({message:"You have successfully logged out!"});
    } catch (e) {
        res.status(404).send({error:"Error in logging out!"});
    }
});
//Get your Profile 
userRouter.get('/users/me',authentication,async function(req,res){
    try {
        const profile = await req.user.getProfile();
        return res.json(profile);
    } catch (error) {
        res.json({error})
    }
});




module.exports=userRouter;