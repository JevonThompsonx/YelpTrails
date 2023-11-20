import seedConnectionString from './seedConnectionString.js';
import photo from '../models/photos.js';
import unsplash from './unsplash.js';
await seedConnectionString();
for (let index = 0; index < 50; index++) {
    const newImage = new photo({
        link: await unsplash()
    });
    await newImage.save();
}
//    const newImage = new photo({
//      link: await unsplash()
//     })
//     await newImage.save();
console.log(await photo.find().then(data => data).catch(err => err));
