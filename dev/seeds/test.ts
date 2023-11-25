import mongoose from "mongoose";
import { trail, user, comment } from "../models/index.js";
import seedConnectionString from "./seedConnectionString.js";
await seedConnectionString();

//test used to check succesful connection to db

// await trail.insertMany([{
//     name: 'Ye ole trail',
//     price: 0,
//     owner: 'Billy bob',
//     location: 'A good area',
//     description: 'Beautiful trail. Love it here'
// },{
//     name: 'Maranda trail',
//     price: 0,
//     owner: 'Maranda Curry',
//     location: 'A bad area',
//     description: 'Beautiful trail. Love it here'
// },{
//     name: 'Jo trail',
//     price: 5,
//     owner: 'Josephine bell',
//     location: 'A tough spot',
//     description: 'Beautiful trail. Love it here'
// },{
//     name: 'Mandy trail',
//     price: 10,
//     owner: 'Amanda Sourneck',
//     location: 'A hilly spot',
//     description: 'Beautiful trail. Love it here'
// },{
//     name: 'Scratch trail',
//     price: 5,
//     owner: 'Billy bob',
//     location: 'The ghetto',
//     description: 'Beautiful trail. Love it here'
// },{
//     name: 'BeautyBoop trail',
//     price: 40,
//     owner: 'Billy bob',
//     location: 'Amazing rich white people area',
//     description: 'Beautiful trail. Love it here'
// }
// ]).then(()=>console.log('succesful')).catch((e)=>console.log(e))

await trail
	.find()
	.then((data) => console.log(data))
	.catch((err) => console.log(err));
