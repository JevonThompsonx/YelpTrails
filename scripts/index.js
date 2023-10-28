import express from 'express';
import path from 'path';
//@ts-ignore
import { trail } from './models/trails.js';
import connectionString from './connectionString.js';
import fileDirName from './file-dir-name.js';
const { __dirname, __filename } = fileDirName(import.meta);
const app = express();
app.use(express.static(path.join(__dirname, '../')));
app.use(express.json());
app.set('view engine', 'ejs');
//sets view folder as '/views'
app.set('views', path.join(__dirname, '../views'));
const port = 8080;
app.listen(port, () => { console.log(`Listening on port ${port}`); });
await connectionString();
app.get('/', (req, res) => {
    res.render('home');
});
app.get('/trails/all', async (req, res) => {
    const allTrails = await trail.find({});
    const someTrails = allTrails.slice(0, 10);
    res.render('allTrails', { allTrails, someTrails });
});
app.get('/trails/:id', async (req, res) => {
    const { id: trailId } = req.params;
    const singleTrail = await trail.findById(trailId);
    res.render('singleTrail', { singleTrail });
});
