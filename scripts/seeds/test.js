import { trail } from '../models/index.js';
import seedConnectionString from './seedConnectionString.js';
await seedConnectionString();
await trail.find().then(data => console.log(data)).catch(err => console.log(err));
