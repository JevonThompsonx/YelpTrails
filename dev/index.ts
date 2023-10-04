import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'; 
import path from 'path';
import ejs from 'ejs';
// @ts-ignore
import fileDirName from './scripts/file-dir-name.js'; 
const { __dirname, __filename } = fileDirName(import.meta);
const API_KEY = process.env.API_KEY; 

await mongoose.connect(`mongodb+srv://Jevonx:${API_KEY}@cluster0.q4o1wzp.mongodb.net/?retryWrites=true&w=majority`,{dbName:'expressConnect'})
    .then(()=> {console.log("Connection succesful");})
    .catch((err) => {console.log(`Connection errrorrrr`);});

const app = express();
