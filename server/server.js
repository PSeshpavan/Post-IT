// Packages
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from "multer";
import cookieParser from 'cookie-parser';
import path from "path";
import { fileURLToPath } from "url";
import helmet from "helmet";
// import morgan from "morgan";
// import flash from 'connect-flash';
// import expressSession from 'express-session';

// Controllers
import { registerUser, loginUser } from './controllers/authController.js';
import { createPost } from './controllers/postController.js';
import { dataFetch } from './controllers/userDataController.js';

// Middlewares
// import isLoggedIn from './middlewares/isLoggedIn.js';
import verifyData from './middlewares/verifyUser.js';

// Database
import connectDB from './config/mongooseConnection.js';


// Routes
import postRoutes from './routes/posts.js';
import frndRoutes from './routes/frndreq.js';


// Constants
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = 3000;

// Middlewares
dotenv.config();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
// app.use(morgan("common"));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, 'public')));
// app.use(
//     expressSession({
//         resave:false,
//         saveUninitialized: false,
//         secret: process.env.SESSION_SECRET,
//     })
// );


// OTHER ROUTES 
app.use('/api/posts', postRoutes);
app.use('/api/friends', frndRoutes);


// DATABASE CONNECTION
connectDB();


// MULTER CONFIG
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let folder = '';
        if (file.originalname.includes('profile-pic') || file.originalname.includes('avatar')) {
            folder = 'public/profilepics/';
        } else if (file.mimetype.startsWith('image/')) {
            folder = 'public/images/';
        } else if (file.mimetype.startsWith('video/')) {
            folder = 'public/videos/';
        } else {
            // handle other file types
        }
        cb(null, folder);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});


const upload = multer({ storage: storage });


// ROUTES
app.get('/api/userdata', dataFetch);

app.post('/api/register', registerUser);

app.post('/api/login', loginUser);

app.post('/api/create-post', verifyData, upload.any(), createPost);





app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});