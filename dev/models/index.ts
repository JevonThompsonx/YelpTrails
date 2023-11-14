import mongoose from 'mongoose'
const {Schema} = mongoose;
import { trail,trailSchema } from './trails.js';
import { user } from './user.js';
import { comment } from './comment.js';
import { location } from './location.js';


export {trail,user,comment,location,trailSchema}