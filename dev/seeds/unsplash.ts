import axios from 'axios';
import { configDotenv } from 'dotenv';
import 'dotenv/config'
configDotenv({path: '../../.env'})
const UNSPLASH_KEY = process.env.UNSPLASH_KEY
export default async ()=> {
    const splashData:any = await axios.get(
    `https://api.unsplash.com/photos/random`,
    {   params: {
        collections: '78796998,3561787,910710,1789878,1181817,2367744,fVjCokXCrm8',
        orientation: 'squarish'
    },
          headers: {
            'Authorization': `Client-ID ${UNSPLASH_KEY}`,
            'Accept-Version': 'v1'
        }
    }
    )
    return splashData.data.urls.raw
}
 