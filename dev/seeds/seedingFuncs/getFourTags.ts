import {tagTypes} from '../seedData/index.js'
import randNumGen from './randNumGen.js'

const geTrandTag = (): String => {
    return tagTypes[randNumGen(tagTypes.length)]
}

export default (): [String] => {
    let tempTagArray: [String] = ['Empty'];

    for (let i = 0; tempTagArray.length < 5; i++) {
        let newTag = geTrandTag();
        if (tempTagArray.includes(newTag)) {} else {
            tempTagArray.push(newTag)
        }
    }
    tempTagArray.shift();

    return tempTagArray
}