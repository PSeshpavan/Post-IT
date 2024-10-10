import express from 'express';
import User from '../models/user-model.js';

const router = express.Router();

// UPDATE!:

// Send a friend request
router.post('/send-request', async (req, res) => {
    const { senderId, receiverId } = req.body;

    try {
        const recipient = await User.findOne({ username: receiverId });
        if (!recipient) {
            return res.status(404).json({ message: 'Recipient not found' });
        }

        // Check if a request already exists
        const existingRequest = recipient.friendRequests.find(request => request.senderId.toString() === senderId);
        if (existingRequest) {
            return res.status(400).json({ message: 'Friend request already sent' });
        }

        // If not then send the request
        recipient.friendRequests.push({ senderId });
        await recipient.save();

        res.status(200).json({ message: 'Friend request sent' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error sending friend request', error });
    }
});



// Accept a friend request
router.post('/accept-request', async (req, res) => {
    const { userId, senderId } = req.body;

    try {
        const user = await User.findById(userId);
        const sender = await User.findById(senderId);

        if (!user || !sender) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Add each other to friends list
        user.friends.push(senderId);
        sender.friends.push(userId);

        // Remove the request from the receiver's friend requests array
        user.friendRequests = user.friendRequests.filter(request => request.senderId.toString() !== senderId);
        await user.save();
        await sender.save();

        res.status(200).json({ message: 'Friend request accepted' });
    } catch (error) {
        res.status(500).json({ message: 'Error accepting friend request', error });
    }
});



// Reject a friend request
router.post('/reject-request', async (req, res) => {
    const { userId, senderId } = req.body;

    try {
        const user = await User.findById(userId);

        // Check if the user exists
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Remove the request from the receiver's friend requests array
        user.friendRequests = user.friendRequests.filter(request => request.senderId.toString() !== senderId);
        await user.save();

        res.status(200).json({ message: 'Friend request rejected' });
    } catch (error) {
        res.status(500).json({ message: 'Error rejecting friend request', error });
    }
});



// Check if a friend request has already been sent
router.get('/check-request', async (req, res) => {
    console.log(req.body,req.params,req.query);
    const { senderId, receiverId } = req.query;

    try {
        // Check if the receiver exists
        const recipient = await User.findOne({ username: receiverId });
        if (!recipient) {
            return res.status(404).json({ message: 'Recipient not found' });
        }

        // Return a message if a request has already been sent
        const existingRequest = recipient.friendRequests.find(request => request.senderId.toString() === senderId);
        if (existingRequest) {
            return res.status(200).json({ message: 'Friend request already sent' });
        }

        // Return a message if no request has been sent
        res.status(200).json({ message: 'No friend request sent' });
    } catch (error) {
        res.status(500).json({ message: 'Error checking friend request', error });
    }
});

export default router;
