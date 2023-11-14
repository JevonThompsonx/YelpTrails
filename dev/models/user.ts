import mongoose from 'mongoose'
const {Schema} = mongoose;

const userSchema = new Schema({
    name: {
        type: String, 
        required: true
    },
    birthDay: {
        type: Date,
        required: true
    },
    // age: (new Date - birthDay),
    comments: {
        type: [String],
        required: true,
        default: []
    }

})

const user = mongoose.model('user',userSchema)

export {user,userSchema}