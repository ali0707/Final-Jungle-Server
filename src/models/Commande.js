const mongoose = require("mongoose");

const CommandeSchema = new mongoose.Schema({
  num: {
    type: String,
    required: true,
  },

  date_cmd: {
    type: Date,
    required: true,
  },
  ModeDePaiement: {
    type: String,
    required: true,
  },

  nom_client: {
    type: String,
    required: true,
  },
  tel_client: {
    type: String,
    required: true,
  },
  EtatDeLivraison: {
    type: String,
    enum: ["encours", "livré", "echec", "retour"],
    default: "encours",
    required: true,
  },

  DateLivraison: {
    type: Date,
    required: true,
  },
  motif: {
    required: true,
    type: String,
  },

  destination: {
    required: true,
    type: String,
  },

  ENVOI_PAR: {
    required: true,
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendeur",
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  ],
});

module.exports = mongoose.model("Commande", CommandeSchema);
