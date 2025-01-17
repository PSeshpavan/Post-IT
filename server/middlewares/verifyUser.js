import jwt from 'jsonwebtoken';
import User from '../models/user-model.js';



export default async function verifyData(req, res, next) {
    const token = req.headers['authorization'];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ username: decoded.username });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    req.user = user;
    next();
}