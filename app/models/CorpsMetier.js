const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

/* Dropdown list pour sélection d'un corps de métier lors de la création de l'artisans */
const CorpsMetierSchema = new mongoose.Schema({
  corps_metier: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model('CorpsMetiers', CorpsMetierSchema);
