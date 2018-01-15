const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const CorpsMetierSchema = new mongoose.Schema({
  corps_metier: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model('CorpsMetier', CorpsMetierSchema);
