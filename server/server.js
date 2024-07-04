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
import expressSession from 'express-session';

import { registerUser, loginUser } from './controllers/authController.js';
import isLoggedIn from './middlewares/isLoggedIn.js';
import connectDB from './config/mongooseConnection.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = 3000;
dotenv.config();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
// app.use(morgan("common"));
app.use(express.urlencoded({ limit:"50mb" , extended: true }));
app.use(cors());
app.use(cookieParser());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));
// app.use(
//     expressSession({
//         resave:false,
//         saveUninitialized: false,
//         secret: process.env.SESSION_SECRET,
//     })
// );
connectDB();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage });

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.post('/api/register', registerUser);

app.post('/api/login', loginUser);

app.get('/home', isLoggedIn, (req, res) => {
    res.render('Welcome to the home page');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});