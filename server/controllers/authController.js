import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import passport from 'passport';

import User from '../models/user-model.js';
// { create, find, findOneAndUpdate, findOneAndDelete }
import generateToken from '../utils/generateToken.js';


export async function registerUser(req, res) {
    try {
        const { name, email, username, password } = req.body;

        const userExists = await User.findOne({ username });
        if (userExists) return res.send("User already exists");

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) return res.send(err.message);
                else {
                    const user = await User.create({
                        name,
                        email,
                        username,
                        password: hash,
                    })
                    res
                    .status(201)
                    .send("User Registered Successfully");
                }
            })
        })
    } catch (err) {
        console.log(err.message);
    }
}

export async function loginUser(req, res) {
    try {
        const { username, password } = req.body;

        let user = await User.findOne({ username });
        if (!user) return res.status(404).send("User not found");

        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                return res
                .status(500)
                .send("Error during password comparison");
            }
            if (result) {
                let token = generateToken(user);
                // const { password, ...userWithoutPassword } = user.toObject();
                res
                .cookie("token", token,{ httpOnly: true, secure: true, sameSite: 'strict' })
                .status(200)
                .json({
                    jwt_token:token,
                    // id:userWithoutPassword._id,
                    id:user._id,
                })
            } else {
                return res
                .status(401)
                .send("Invalid password");
            }
        });
    } catch (err) {
        console.log(err.message);
        res
        .status(500)
        .send("Server error");
    }
};


