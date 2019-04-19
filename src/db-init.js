import mongoose from 'mongoose';
import ProgramValue from './models/program-value';

require('dotenv').config()

const MONGODB_USERNAME = process.env.MONGODB_USERNAME;
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
const MONGODB_URL = process.env.MONGODB_URL;

mongoose.connect('mongodb+srv://'+MONGODB_USERNAME+':'+MONGODB_PASSWORD+'@'+MONGODB_URL);

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB database connection established successfully!');
});

ProgramValue.find((err, res) => {
  if (err)
    console.log(err);
  else{
    if (res && res.length > 0){
      ProgramValue.collection.drop(_ => {
        console.log('Successfully dropped the collectiion');
      });
    }
    let programs = require('./models/all-programs');
    programs.forEach(program => {
      let newProgram = new ProgramValue(program);
      newProgram.save().then(_id => {
        console.log(`${program.name} added successfully`)
      })
      .catch(err => {
        console.log(`failed to add`)
      });
    });
  }
});

