const Track = require('./controllers/track');

module.exports = function (app) {
  app.post('/save', Track.save);
  app.get('/all', Track.find);
}