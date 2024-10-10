import User from '../models/user-model.js';
import Post from '../models/post-model.js'
import Image from '../models/image.js';
import Video from '../models/video.js';

export async function createPost(req, res ) {
    try {
        const postText = req.body.text;
        const mediaFiles = req.files;

        const images = await Promise.all(mediaFiles.filter(file => file.mimetype.startsWith('image/')).map(file => {
            const image = new Image({ url: file.filename });
            return image.save(); // Save the image document and return the promise
        }));

        const videos = await Promise.all(mediaFiles.filter(file => file.mimetype.startsWith('video/')).map(file => {
            const video = new Video({ url: file.filename });
            return video.save(); // Save the video document and return the promise
        }));

        const newPost = new Post({
            caption: postText,
            postImages: images.map(image => image._id), // Use the _id of the saved image documents
            postVideos: videos.map(video => video._id), // Use the _id of the saved video documents
            userId: req.user._id,
        });


        await newPost.save();

        await User.findByIdAndUpdate(
            req.user._id,
            { $push: { MyPosts: newPost._id } },
            { new: true }
        );

        res.status(201).json({ message: 'Post created successfully', post: newPost });
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ message: 'Error creating post' });
    }
}