// import { Schema, model } from "mongoose";

// // Define Comment Schema
// const commentSchema = new Schema({
//     userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
//     text: { type: String, required: true },
//     createdAt: { type: Date, default: Date.now }
// });

// // Define Post Schema
// const imageSchema = new Schema({
//     url: { type: String, required: true },
//     uploadDate: { type: Date, default: Date.now }
// });

// const videoSchema = new Schema({
//     url: { type: String, required: true },
//     uploadDate: { type: Date, default: Date.now }
// });

// // Define Post Schema
// const postSchema = new Schema({
//     userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
//     postImages: [imageSchema], // Use imageSchema for image items
//     postVideos: [videoSchema], // Use videoSchema for video items
//     caption: { type: String },
//     likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
//     comments: [commentSchema],
//     createdAt: { type: Date, default: Date.now },
//     updatedAt: { type: Date, default: Date.now }
// });


// // Middleware to update the updatedAt field on save
// postSchema.pre('save', function (next) {
//     this.updatedAt = Date.now();
//     next();
// });

// export const Post = model('Post', postSchema);
// export default Post;

import { Schema, model } from "mongoose";

// Define Comment Schema
const commentSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

// Define Image Schema
const imageSchema = new Schema({
    url: { type: String, required: true },
    uploadDate: { type: Date, default: Date.now }
});


// Define Video Schema
const videoSchema = new Schema({
    url: { type: String, required: true },
    uploadDate: { type: Date, default: Date.now }
});

// Define Post Schema
const postSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    postImages: [{ type: Schema.Types.ObjectId, ref: 'Image' }],
    postVideos: [{ type: Schema.Types.ObjectId, ref: 'Video' }],
    caption: { type: String },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    comments: [commentSchema],
});

export const Post = model('Post', postSchema);
export default Post;

