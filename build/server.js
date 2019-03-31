"use strict";

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _point = _interopRequireDefault(require("./models/point.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express.default)();

var router = _express.default.Router();

app.use((0, _cors.default)());
app.use(_bodyParser.default.json());

_mongoose.default.connect('mongodb+srv://admin:admin@cluster0-d5qot.mongodb.net/test?retryWrites=true');

var connection = _mongoose.default.connection;
connection.once('open', function () {
  console.log('MongoDB database connection established successfully!');
});
app.use('/', router);
router.route('/').get(function (req, res) {
  res.send('success');
});
router.route('/points').get(function (req, res) {
  _point.default.find(function (err, points) {
    if (err) console.log(err);else res.json(points);
  });
});
router.route('/points/:id').get(function (req, res) {
  _point.default.findById(req.params.id, function (err, point) {
    if (err) console.log(err);else res.json(point);
  });
});
router.route('/points/add').post(function (req, res) {
  var point = new _point.default(req.body);
  point.save().then(function (point) {
    res.status(200).json({
      'point': 'Added successfully'
    });
  }).catch(function (err) {
    res.status(400).send('Failed to create new record');
  });
});
router.route('/points/update/:id').post(function (req, res) {
  _point.default.findById(req.params.id, function (err, point) {
    if (!point) return next(new Error('Could not load Document'));else {
      point.title = req.body.title;
      point.responsible = req.body.responsible;
      point.description = req.body.description;
      point.severity = req.body.severity;
      point.status = req.body.status;
      point.save().then(function (point) {
        res.json('Update done');
      }).catch(function (err) {
        res.status(400).send('Update failed');
      });
    }
  });
});
router.route('/points/delete/:id').get(function (req, res) {
  _point.default.findByIdAndRemove({
    _id: req.params.id
  }, function (err, point) {
    if (err) res.json(err);else res.json('Removed successfully');
  });
});
var port = process.env.PORT;

if (port == null || port == "") {
  port = 4000;
}

app.listen(port, function () {
  return console.log("Express server running on port:" + port);
});
//# sourceMappingURL=server.js.map