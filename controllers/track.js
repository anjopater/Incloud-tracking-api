const Track = require('../models/track');
const moment = require('moment');

exports.save = function (req, res, next) {
  const time = req.body.time;
  const description = req.body.description;
  const date = req.body.date;
  const track = new Track({'time': time, 'description': description, 'date': date});
  track.save(function (err) {
    if (err) {
      return next(err);
    }
    res.json({state: 'success'});
  });
};

exports.find = function (req, res, next) {
  const limit = req.query.limit;
  let search = {};

  if (req.query.term) {
    search = {
      $text: {
        $search: req.query.term
      }
    }
  } else if (req.query.startDate) {
    search = {
      date: {
        "$gte": new Date(moment(req.query.startDate, ["YYYY", moment.ISO_8601]).format('YYYY-MM-DD')).toString(),
        "$lte": new Date(moment(req.query.endDate, ["YYYY", moment.ISO_8601]).format('YYYY-MM-DD')).toString()
      }
    }
  }

  Track.find(search, null, {
    sort: {
      date: 1
    },
    skip: 0,
    limit: parseInt(limit)
      ? parseInt(limit)
      : 8
    })
    .exec(function (err, tracks) {
      if (err) {
        return next(err);
      }
      res.json({tracks});
    });
};
