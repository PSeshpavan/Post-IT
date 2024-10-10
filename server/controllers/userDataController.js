// import jwt from 'jsonwebtoken';
// import User from '../models/user-model.js';


// export async function dataFetch (req,res) {
//     const token = req.headers['authorization'];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.id);
//     user.password = undefined;
//     res.json(user);
// }
import jwt from 'jsonwebtoken';
import User from '../models/user-model.js';

export async function dataFetch(req, res) {
    try {
        const token = req.headers['authorization'];
        if (!token) {
            return res.status(401).json({ message: 'Authentication token is required' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password'); // Exclude password from user data
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching user data:', error.message);
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        res.status(500).json({ message: 'Server error' });
    }
}
