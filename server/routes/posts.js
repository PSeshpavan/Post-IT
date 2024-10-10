// routes/posts.js
import express from 'express';
import Post from '../models/post-model.js';
import Image from '../models/image.js';
import Video from '../models/video.js';

const router = express.Router();

// Get all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().populate('userId', 'username profilePic');
        res.json(posts);
        // console.log("INSIDE POSTS",posts);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
});

// Get a single post
// router.get('/:postId', async (req, res) => {
//     try {
//         const post = await Post.findById(req.params.postId).populate('userId', 'username profilePic');
//         if (!post) return res.status(404).json({ error: 'Post not found' });
//         res.json(post);
//     } catch (err) {
//         res.status(500).json({ error: 'Failed to fetch post' });
//     }
// });

// Like/Unlike a post
router.post('/:postId/like', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) return res.status(404).json({ error: 'Post not found' });

        const userId = req.body.userId;
        const isLiked = req.body.isLiked;

        if (isLiked) {
            post.likes.push(userId);
        } else {
            post.likes = post.likes.filter(id => id.toString() !== userId);
        }

        await post.save();
        res.json({ likes: post.likes.length });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update like status' });
    }
});

// Add a comment to a post
router.post('/:postId/comment', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) return res.status(404).json({ error: 'Post not found' });

        const comment = {
            userId: req.body.userId,
            text: req.body.text,
            createdAt: new Date(),
        };

        post.comments.push(comment);
        await post.save();
        res.json({ comments: post.comments });
    } catch (err) {
        res.status(500).json({ error: 'Failed to add comment' });
    }
});

// explore page posts
router.get('/explore', async (req, res) => {
    const { page = 1, limit = 8 } = req.query;

    try {
        const posts = await Post.find()
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(Number(limit))
            .populate('postImages', '_id url') // Populate postImages with _id and url fields
            .populate('postVideos', '_id url'); // Populate postVideos with _id and url fields

        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching posts' });
    }
});



// router.get('/:id', async (req, res) => {
//     const { id } = req.params;
//     try {
//         const post = await Post.findById(id)
//             .populate({ path: 'userId', select: 'name email username profilePic' }) // Exclude password
//             .populate('comments.userId', 'username profilePic') // Populate comments user with specific fields
//             .populate('likes', 'username profilePic'); // Populate likes with specific fields

//         // Convert the postImages and postVideos to an array of objects containing the URL and uploadDate
//         const postImages = post.postImages.map(image => ({
//             url: image.url,
//             uploadDate: image.uploadDate
//         }));

//         const postVideos = post.postVideos.map(video => ({
//             url: video.url,
//             uploadDate: video.uploadDate
//         }));
//         console.log(postImages, postVideos,post);
//         res.json({ 
//             ...post.toObject(), 
//             postImages, 
//             postVideos 
//         });
//     } catch (error) {
//         console.error('Error fetching post:', error);
//         res.status(500).json({ message: 'Error fetching post' });
//     }
// });

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findById(id)
            .populate({ path: 'userId', select: 'name email username profilePic' }) // Exclude password
            .populate('comments.userId', 'username profilePic') // Populate comments user with specific fields
            .populate('likes', 'username profilePic') // Populate likes with specific fields
            .populate('postImages') // Populate images
            .populate('postVideos'); // Populate videos

        res.json({ ...post.toObject() });
    } catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).json({ message: 'Error fetching post' });
    }
});

export default router;
