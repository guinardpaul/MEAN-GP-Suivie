const mongoose = require('mongoose');
const CorpsMetier = require('./CorpsMetier');
mongoose.Promise = global.Promise;

// BackEnd Validators Definition
// Validators Function
let validNomChecker = nom => {
  if (!nom) {
    return false;
  } else {
    const regExp = new RegExp(/[a-zA-z-_éè]+$/);
    return regExp.test(nom);
  }
};

let validPrenomChecker = prenom => {
  if (!prenom) {
    return false;
  } else {
    const regExp = new RegExp(/[a-zA-z-_éè]+$/);
    return regExp.test(prenom);
  }
};

let validEmailChecker = email => {
  if (!email) {
    return false;
  } else {
    const regExp = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    return regExp.test(email);
  }
};

// Validators
const nomValidator = [
  {
    validator: validNomChecker,
    message: 'Le nom doit être composé seulement de lettres'
  }
];

const prenomValidator = [
  {
    validator: validPrenomChecker,
    message: 'Le nom doit être composé seulement de lettres'
  }
];

const emailValidator = [
  {
    validator: validEmailChecker,
    message: 'Email invalide'
  }
];

const ArtisanSchema = new mongoose.Schema({
  civilite: {
    type: String,
    enum: ['', 'Mr', 'Mme/Mlle']
  },
  nom_societe: {
    type: String,
    required: true
  },
  corps_metier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CorpsMetier',
    required: true
  },
  nom: {
    type: String,
    required: true,
    validate: nomValidator
  },
  prenom: {
    type: String,
    required: true,
    validate: prenomValidator
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    validate: emailValidator
  },
  adresse: String,
  complAdresse: String,
  cp: Number,
  ville: String,
  numTel: String
});

module.exports = mongoose.model('Artisan', ArtisanSchema);
