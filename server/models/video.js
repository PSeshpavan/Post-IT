import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  url: { type: String, required: true },
  uploadDate: { type: Date, default: Date.now }
});

const Video = mongoose.model('Video', videoSchema);

export default Video;