import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    name: { type: String, required: true, unique: true},
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    MyPosts: {
        type: Array,
        default: []
    },
    friends: {
        type: Array,
        default: []
    },
    MyStories: {
        type: Array,
        default: []
    },
    UserDP: String,
});

export default model('User', userSchema);