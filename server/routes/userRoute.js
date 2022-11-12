const express = require('express');
const userRouter = express.Router();
const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../authMiddleware/authMiddleware');
userRouter.post('/register', async (req, res) => {

    try {
        console.log(req.body);
        const userExists = await userModel.findOne({ email: req.body.email });
        if (userExists) {
            return res.status(400).send({ message: "User already exists ", success: false });
        }
        else {
            console.log(1);
            const password = req.body.password;
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            req.body.password = hashedPassword;
            const newUser = await new userModel(req.body);
            await newUser.save();
            return res.status(201).send({ message: "User created ", success: true });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "User creation failed ", success: false, error: error.message });
    }
});

userRouter.post('/login', async (req, res) => {

    try {
        const user = await userModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).send({ message: "User not found ", success: false });
        }
        else {
            const password = req.body.password;
            const isMatch = await bcrypt.compare(req.body.password, user.password);
            if (!isMatch) {
                res.status(401).send({ message: "password mismatch", success: false });
            }
            else {
                const token = jwt.sign({ id: user._id }, process.env.JWT_SECRECT, {
                    expiresIn: '1d'
                });
                return res.status(200).send({
                    message: "User logged in successfully",
                    success: true,
                    data: token
                })
            }
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: "Error in server", success: false, error: error.message });
    }
});

userRouter.post('/get-user-info-by-id', authMiddleware, async (req, res) => {
   try {
    const user = await userModel.findOne({
        _id:req.body.userId
    });
    console.log(req.body.userId);
    if(!user)
    {
        return res.status(400).send({
            message:"user not found",
            success:false
        });
    }
    else{
        return res.status(200).send({
            message:"user found",
            success:true,
            data:{
                name:user.name,
                email:user.email,
            }
        })
    }
   } catch (error) {
    
   }
})

module.exports = userRouter;