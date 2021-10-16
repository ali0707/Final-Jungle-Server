const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    designation: {
      type: String,
      required: true,
      trim: true,
    },
    reference: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    marque: {
      type: String,
      required: true,
      trim: true,
    },
    couleur: {
      type: String,
    },
    quantity: {
      type: Number,
      required: true,
    },
    prix: {
      type: Number,
      required: true,
    },
    prix_promo: {
      type: Number,
    },
    slug: {
      type: String,

      unique: true,
    },
    status: {
      type: String,
      enum: ["actif", "inactif"],
      default: "actif",
    },
    description: {
      type: String,

      required: true,
      trim: true,
    },

    taux_de_retour: {
      type: Number,
    },

    offer: { type: Number },

    productPictures: [{ img: { type: String } }],

    reviews: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        review: String,
      },
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

      required: true,
    },

    type: {
      type: String,
    },

    ecran: {
      type: String,
    },
    processeur: {
      type: String,
    },

    systemeExploitation: {
      type: String,
    },

    ram: {
      type: String,
    },

    graph: {
      type: String,
    },

    disqueDur: {
      type: String,
    },

    enPromo: {
      type: Boolean,
    },

    promo: {
      type: Number,
    },

    dateDebutPromo: {
      type: Date,
    },

    dateFinPromo: {
      type: Date,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendeur",
    },

    metaTitle: {
      type: String,
    },
    metaDesc: {
      type: String,
    },
    url: {
      type: String,
    },
    motCle: {
      type: String,
    },
    minQuantity: {
      type: Number,
    },

    //caractéristique
    smartTV: {
      type: Boolean,
    },

    withRecepteur: {
      type: Boolean,
    },

    stockage: {
      type: Number,
    },

    //

    normeHd: {
      type: String,
    },

    resolution: {
      type: String,
    },
    capacite: {
      type: String,
    },
    puissance: {
      type: String,
    },
    vitesses: {
      type: String,
    },
    matiere: {
      type: String,
    },
    alimentation: {
      type: String,
    },

    mode: {
      type: String,
    },

    refroidissement: {
      type: String,
    },

    volume: {
      type: String,
    },

    classe: {
      type: String,
    },

    largeur: {
      type: String,
    },

    nbrFoyer: {
      type: String,
    },

    pose: {
      type: String,
    },

    ouverture: {
      type: String,
    },

    ecranTactile: {
      type: Boolean,
    },

    //stat
    taux_de_conversion: {
      type: Number,
    },
    nbr_de_vue: {
      type: Number,
    },
    quantite_vendue: {
      type: Number,
    },
    revenu: {
      type: Number,
    },
    best_price: {
      type: Number,
    },
    taux_rotation: {
      type: Number,
    },
    duree_stockage: {
      type: Number,
    },
    stock_recommande: {
      type: String,
    },
    nbr_de_vente: {
      type: Number,
    },
    stock_initial: {
      type: Number,
    },

    stock_final: {
      type: Number,
    },

    stock_moyen: {
      type: Number,
    },

    createdAt: Date,
    updatedAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
