const mongoose = require("mongoose");

const CommandeSchema = new mongoose.Schema({
  num: {
    type: String,
    required: true,
  },

  date_cmd: {
    type: String,
    required: true,
  },
  ModeDePaiement: {
    type: String,
    required: true,
  },
  ref_produit: {
    type: String,
    required: true,
  },
  nom_prod: {
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
    type: String,
    required: true,
  },
  motif: {
    required: true,
    type: String,
  },
  montant: {
    required: true,
    type: Number,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendeur",
  },
});

module.exports = mongoose.model("Commande", CommandeSchema);
