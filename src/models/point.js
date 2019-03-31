import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Point = new Schema({
    name: {
        type: String
    },
    point: {
        type: Number 
    },
    type: {
        type: String
    },
    accountNumber: {
        type: String,
        default: ''
    },
    expiration: {
        type: Date,
        default: new Date()
    }
});

export default mongoose.model('Point', Point);