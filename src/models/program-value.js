import mongoose from 'mongoose';

const Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

let ProgramValue = new Schema({
  name: {
    type: String
  },
  value: {
    type: Number
  },
  id: ObjectId
});

export default mongoose.model('ProgramValue', ProgramValue);