import jwt from 'jsonwebtoken';
import User from '../models/user-model.js';

export default async function isLoggedIn(req, res, next) {
    if(!req.cookies.token){
        return res.sendStatus(401);
        // return res.redirect('/login');
    }

    try{
        let decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
        let user = await User
            .findOne({username: decoded.username})
            .select('-password');
        req.user = user;
        next();
    } catch(err){
        
        // return res.redirect('/login');
    }
}