import express from 'express'
import path from 'path';
import ejs from 'ejs';
//@ts-ignore
import {trail,user,comment, trailSchema, trail} from './models/trails.js'
import connectionString from './connectionString.js'

import fileDirName from './file-dir-name.js'; 
const { __dirname, __filename } = fileDirName(import.meta);

const app = express();
app.use(express.static(path.join(__dirname, '../')));
app.use(express.json())
app.set('view engine', 'ejs');
//sets view folder as '/views'
app.set('views', path.join(__dirname, '../views'))

const port = 8080;


app.listen(port, ()=> {console.log(`Listening on port ${port}`);});

await connectionString();

app.get('/',(req,res)=> {
    res.render('home')
}) 
app.get('/trails/all',async (req,res)=> {
    const allTrails = await trail.find({})
    res.render('allTrails',{allTrails})
})

app.get('/trails/:id',async (req,res)=> {
    const {id:trailId} = req.body
    const singleTrail = await trail.find({id:trailId})
    res.render('singleTrail',{singleTrail})
})

