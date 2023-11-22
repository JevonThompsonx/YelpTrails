import {descriptors,places} from '../seedData/index.js'
import randNumGen from './randNumGen.js'
export default (): string => {
    const descriptorArrayLength = descriptors.length
    const randDescriptor = descriptors[randNumGen(descriptorArrayLength)]
    const placesArrayLength = places.length
    const randPlace = places[randNumGen(placesArrayLength)]
    return `${randDescriptor} ${randPlace} `
}

