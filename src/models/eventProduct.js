const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
    {
        designation: {
            type: String,
            required: true,
            trim: true,
        },

        prix: {
            type: Number,
        },

        remise: {
            type: Number
        },

        prix_promo: {
            type: Number,
        },

        stock_promo: {
            type: Number,
        },

        nbr_vente: {
            type: Number,
        },

        createdAt: Date,
        updatedAt: Date,
    },
    { timestamps: true }
);

module.exports = mongoose.model("EventProduct", productSchema);
