const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userModel = require('../models/user.model');

async function registerUser(req, res) {
    const { username, email, password, role } = req.body;

    const isUserAlreadyExists = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    });

    if (isUserAlreadyExists) {
        return res.status(409).json({ message: 'User already exists' });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await userModel.create({
        username,
        email,
        password: hash,
        role
    });

    const token = jwt.sign({
        _id: user._id,
        role: user.role
    }, process.env.JWT_SECRET);

    res.cookie('token', token);
    res.status(201).json({
        message: 'User registered successfully',
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        }
    });
}
async function loginUser(req,res){
    const{username,email,password}=req.body;
    const user=await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })
    if(!user){
        return res.status(404).json({message:"Invalid credintials"})
    }
    const isPasswordValid=await bcrypt.compare(password,user.password)
    if(!isPasswordValid){
        return res.status(404).json({message:"Invalid credintials"})
    }
    const token=jwt.sign({
        id:user._id,
        role:user.role,
    },process.env.JWT_SECRET)
    res.cookie("token",token)
       res.status(201).json({
        message: 'User registered successfully',
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        }
    });
}
async function logoutUser(req,res){
    res.clearCookie("token")
    res.status(200).json({
        message:"user loged out"
    })
}
module.exports = { registerUser,loginUser ,logoutUser};