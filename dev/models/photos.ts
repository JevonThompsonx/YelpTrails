import mongoose from 'mongoose'
const {Schema} = mongoose;

const photosSchema = new Schema( {
   link : {
        type: String,
        required: true 
    }
}
) 

const photo = mongoose.model('photo',photosSchema)

export default photo