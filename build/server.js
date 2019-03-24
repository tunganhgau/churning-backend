"use strict";

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _Issue = _interopRequireDefault(require("./models/Issue"));

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
router.route('/issues').get(function (req, res) {
  _Issue.default.find(function (err, issues) {
    if (err) console.log(err);else res.json(issues);
  });
});
router.route('/issues/:id').get(function (req, res) {
  _Issue.default.findById(req.params.id, function (err, issue) {
    if (err) console.log(err);else res.json(issue);
  });
});
router.route('/issues/add').post(function (req, res) {
  var issue = new _Issue.default(req.body);
  issue.save().then(function (issue) {
    res.status(200).json({
      'issue': 'Added successfully'
    });
  }).catch(function (err) {
    res.status(400).send('Failed to create new record');
  });
});
router.route('/issues/update/:id').post(function (req, res) {
  _Issue.default.findById(req.params.id, function (err, issue) {
    if (!issue) return next(new Error('Could not load Document'));else {
      issue.title = req.body.title;
      issue.responsible = req.body.responsible;
      issue.description = req.body.description;
      issue.severity = req.body.severity;
      issue.status = req.body.status;
      issue.save().then(function (issue) {
        res.json('Update done');
      }).catch(function (err) {
        res.status(400).send('Update failed');
      });
    }
  });
});
router.route('/issues/delete/:id').get(function (req, res) {
  _Issue.default.findByIdAndRemove({
    _id: req.params.id
  }, function (err, issue) {
    if (err) res.json(err);else res.json('Removed successfully');
  });
});
var port = process.env.PORT;

if (port == null || port == "") {
  port = 4000;
}

app.listen(4000, function () {
  return console.log("Express server running on port 4000");
});
//# sourceMappingURL=server.js.map