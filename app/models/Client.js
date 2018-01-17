const mongoose = require('mongoose');
const Artisans = require('./Artisans');
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

const ClientSchema = new mongoose.Schema({
  affaire: {
    type: String,
    required: true,
    unique: true
  },
  civilite: {
    type: String,
    enum: ['', 'Mr', 'Mme/Mlle']
  },
  status_client: {
    type: Boolean,
    default: false
  },
  moe: [
    {
      corps_metier: {
        type: String
      },
      artisan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artisans',
        required: true
      }
    }
  ],
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
  adresseFact: String,
  complAdresseFact: String,
  cpFact: Number,
  villeFact: String,
  adresseChantier: String,
  complAdresseChantier: String,
  cpChantier: Number,
  villeChantier: String,
  numTel: String
});

module.exports = mongoose.model('Client', ClientSchema);
