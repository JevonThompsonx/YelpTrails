import express from 'express';
import path from 'path';
import { trail } from './models/trails.js';
import connectionString from './connectionString.js';
import fileDirName from './file-dir-name.js';
const { __dirname, __filename } = fileDirName(import.meta);
const app = express();
app.use(express.static(path.join(__dirname, '../')));
//form parse
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.set('view engine', 'ejs');
//sets view folder as '/views'
app.set('views', path.join(__dirname, '../views'));
const port = 8080;
app.listen(port, () => { console.log(`Listening on port ${port}`); });
await connectionString();
app.get('/', (req, res) => {
    res.render('home', { pageName: 'Home' });
});
app.get('/trails/all', async (req, res) => {
    const allTrails = await trail.find();
    const pageName = 'Trails | All trails';
    res.render('trails/all', { pageName, allTrails });
});
app.get('/trails/:id', async (req, res) => {
    const { id: trailId } = req.params;
    const singleTrail = await trail.findById(trailId);
    const pageName = singleTrail?.name;
    res.render('trails/single', { singleTrail, pageName });
});
app.get('/trails/owners/:id', async (req, res) => {
    const { id: trailOwnerName } = req.params;
    const trailsByOwnerName = await trail.find({ owner: trailOwnerName });
    res.render('trails/byOwnerName', { trailsByOwnerName, trailOwnerName });
});
app.get('/trails/tags/:id', async (req, res) => {
    const { id: tag } = req.params;
    const taggedTrails = await trail.find({ tags: tag });
    const pageName = `Tags | ${tag}`;
    res.render('trails/tag', { tag, taggedTrails, pageName });
});
app.get('/newTrail', (req, res) => {
    res.render('trails/new', { pageName: 'New Trail' });
});
app.post('/newTrail', async (req, res) => {
    const { newTrailName } = req.body;
    console.log(newTrailName);
});
app.get('*', (req, res) => {
    res.render('unknownPage', { pageName: 'Unknown page' });
});
