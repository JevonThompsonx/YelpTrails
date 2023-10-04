import mongoose from 'mongoose'
import 'dotenv/config'
import {trail,user,comment} from './trails.js'
const API_KEY = process.env.API_KEY;
await mongoose.connect(`mongodb+srv://Jevonx:${API_KEY}@cluster0.q4o1wzp.mongodb.net/?retryWrites=true&w=majority`,{dbName:'expressConnect'})
    .then(()=> {console.log("Connection succesful");})
    .catch((err) => {console.log(`Connection errrorrrr`);});

await trail.insertMany([{
    name: 'Ye ole trail',
    price: 0,
    owner: 'Billy bob',
    location: 'A good area',
    description: 'Beautiful trail. Love it here'
},{
    name: 'trail',
    price: 0,
    owner: 'Maranda Curry',
    location: 'A bad area',
    description: 'Beautiful trail. Love it here'
},{
    name: 'trail',
    price: 5,
    owner: 'Josephine bell',
    location: 'A tough spot',
    description: 'Beautiful trail. Love it here'
},{
    name: 'trail',
    price: 10,
    owner: 'Amanda Sourneck',
    location: 'A hilly spot',
    description: 'Beautiful trail. Love it here'
},{
    name: 'trail',
    price: 5,
    owner: 'Billy bob',
    location: 'The ghetto',
    description: 'Beautiful trail. Love it here'
},{
    name: 'trail',
    price: 40,
    owner: 'Billy bob',
    location: 'Amazing rich white people area',
    description: 'Beautiful trail. Love it here'
}
])