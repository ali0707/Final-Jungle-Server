const mongoose = require("mongoose");

const calendarSchema = new mongoose.Schema(
  {
    image: {
      img: { type: String },
    },

    nom: {
      type: String,
      required: true,
    },

    date_debut: {
      type: Date,
      required: true,
    },

    date_fin: {
      type: Date,
      required: true,
    },

    fin_enregistrement: {
      type: Date,
      required: true,
    },

    caracteristique: {
      type: String,
      required: true,
    },

    produits: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    ],

    nbr_produits: {
      type: Number,
      required: true,
    },
    nbr_vendeurs: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["A venir", "Expirée", "En cours"],
      default: "A venir",
    },

    joinRequest: {
      type: String,
      enum: ["Approved", "Hold", "Refused", "Null"],
      default: "Null",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Calendar", calendarSchema);
