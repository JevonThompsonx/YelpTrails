import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import path from 'path';
// @ts-ignore
import fileDirName from './file-dir-name.js';
const { __dirname, __filename } = fileDirName(import.meta);
const API_KEY = process.env.API_KEY;
await mongoose.connect(`mongodb+srv://Jevonx:${API_KEY}@cluster0.q4o1wzp.mongodb.net/?retryWrites=true&w=majority`, { dbName: 'expressConnect' })
    .then(() => { console.log("Connection succesful"); })
    .catch((err) => { console.log(`Connection errrorrrr`); });
const app = express();
app.use(express.static(path.join(__dirname, '../')));
app.use(express.json());
app.set('view engine', 'ejs');
//sets view folder as '/views'
app.set('views', path.join(__dirname, '../views'));
const port = 8080;
app.listen(port, () => { console.log(`Listening on port ${port}`); });
app.get('/', (req, res) => {
    res.render('home');
});
