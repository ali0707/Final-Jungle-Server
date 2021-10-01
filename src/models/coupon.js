const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema(
  {
    titre: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    code: {
      type: String,
      required: true,
    },

    remise: {
      type: Number,
      required: true,
    },

    limite: {
      type: Number,
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

    produits: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    ],

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendeur",
    },

    status: {
      type: String,
      enum: ["actif", "inactif"],

      default: "actif",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Coupon", couponSchema);
