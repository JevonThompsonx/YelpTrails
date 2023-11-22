import mongoose from 'mongoose'
import seedConnectionString from './seedConnectionString.js';
import photo from '../models/photos.js';
import unsplash from './seedingFuncs/unsplash.js';
await seedConnectionString();

const retrieiveNewImages = async ()=> {
for (let index = 0; index < 50; index++) {
    const newImage = new photo({
     link: await unsplash()
    })
   
    await newImage.save();
}
console.log('Done')
}

await retrieiveNewImages();