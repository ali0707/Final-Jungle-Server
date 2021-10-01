const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const vendeurSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 20,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    hash_password: {
      type: String,
      required: true,
    },
    nomBoutique: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
    },
    phoneNumber: {
      required: true,
      type: String,
    },

    //informations commerciales
    raisonSociale: {
      required: true,
      type: String,
    },

    matriculeFiscale: {
      required: true,
      type: String,
    },
    adresse: {
      required: true,
      type: String,
    },

    codePostale: {
      required: true,
      type: Number,
    },

    //informations bancaires
    titulaireCompte: {
      required: true,
      type: String,
    },

    RIB: {
      required: true,
      type: String,
    },
    nomBanque: {
      required: true,
      type: String,
    },

    identifiantUnique: {
      required: true,
      type: String,
    },

    role: {
      type: String,
      enum: ["user", "admin", "vendeur"],
      default: "vendeur",
    },
    accessToken: {
      type: String,
    },

    profilePicture: {
      type: String,
    },

    cin: {
      type: String,
    },

    patente: {
      type: String,
    },

    registre: {
      type: String,
    },

    comment: {
      type: String,
    },
  },
  { timestamps: true }
);

vendeurSchema.virtual("password").set(function (password) {
  this.hash_password = bcrypt.hashSync(password, 10);
});

vendeurSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

vendeurSchema.methods = {
  authentificate: function (password) {
    return bcrypt.compareSync(password, this.hash_password);
  },
};

module.exports = mongoose.model("Vendeur", vendeurSchema);
