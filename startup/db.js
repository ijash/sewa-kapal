const mongoose = require('mongoose');

module.exports = function() {
  mongoose.connect('mongodb://localhost/shipyard', { useCreateIndex: true, useNewUrlParser: true })
    .then(() => console.log(`Connected to database`));
}