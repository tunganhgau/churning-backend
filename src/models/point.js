import mongoose from 'mongoose';

const Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

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
  },
  id: ObjectId
});

export default mongoose.model('Point', Point);