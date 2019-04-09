import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import Point from './models/point.js';

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://admin:admin@cluster0-d5qot.mongodb.net/test?retryWrites=true');

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB database connection established successfully!');
});

app.use('/', router);

router.route('/').get((req, res) => {
  res.send('success');
});

router.route('/points').get((req, res) => {
  Point.find((err, points) => {
    if (err)
      console.log(err);
    else
      res.json(points);
  });
});

router.route('/points/:id').get((req, res) => {
  Point.findById(req.params.id, (err, point) => {
    if (err)
      console.log(err);
    else
      res.json(point);
  })
});

router.route('/points/add').post((req, res) => {
  let point = new Point(req.body);
  point.save()
    .then(point => {
      res.status(200).json({ 'point': 'Added successfully' });
    })
    .catch(err => {
      res.status(400).send('Failed to create new record');
    });
});

router.route('/points/update/:id').post((req, res) => {
  Point.findById(req.params.id, (err, point) => {
    if (!point)
      return next(new Error('Could not load Document'));
    else {
      point.name = req.body.name;
      point.point = req.body.point;
      point.expiration = req.body.expiration;
      point.type = req.body.type;
      point.accountNumber = req.body.accountNumber;
      point.save().then(point => {
        res.json('Update done');
      }).catch(err => {
        res.status(400).send('Update failed');
      });
    }
  });
});

router.route('/points/delete/:id').delete((req, res) => {
  Point.findByIdAndRemove({ _id: req.params.id }, (err, point) => {
    if (err)
      res.json(err);
    else
      res.json('Removed successfully');
  });
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 4000;
}

app.listen(port, () => console.log(`Express server running on port:` + port));

