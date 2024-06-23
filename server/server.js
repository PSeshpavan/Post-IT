import express from 'express';
import cors from 'cors';
import axios from 'axios';


const app = express();
const port = 3000;

app.use(cors());

app.use(urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});