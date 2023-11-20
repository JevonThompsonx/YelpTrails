import axios from 'axios';
import { configDotenv } from 'dotenv';
import 'dotenv/config';
configDotenv({ path: '../../.env' });
const UNSPLASH_KEY = process.env.UNSPLASH_KEY;
export default async () => {
    const splashData = await axios.get(`https://api.unsplash.com/photos/random`, { params: {
            collections: 'tMD-_D386xo,8979943,371513,2072048,385579,3157887,loVEEY5cpe8,2278595,3561787',
            orientation: 'squarish  '
        },
        headers: {
            'Authorization': `Client-ID ${UNSPLASH_KEY}`,
            'Accept-Version': 'v1'
        }
    });
    return splashData.data.urls.raw;
};
