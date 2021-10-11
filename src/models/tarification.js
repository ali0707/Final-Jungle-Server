const mongoose = require("mongoose");

const TarificationSchema = new mongoose.Schema({
  num: {
    type: String,
    required: true,
  },
  categories: {
    type: String,
    required: true,
  },

  taux: {
    type: Number,
    required: true,
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendeur",
  },
});

module.exports = mongoose.model("Tarification", TarificationSchema);
