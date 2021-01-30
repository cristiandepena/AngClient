const mongoose = require('mongoose');

const {Schema} = mongoose;

const clientSchema = Schema({
  name: 'string',
  addresses: []
});

module.exports = mongoose.model('Client', clientSchema);
