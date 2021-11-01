const mongoose = require("mongoose");

const abonnementSchema = new mongoose.Schema(
    {

        vendeur:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Vendeur",
            required: true,
        },

        montant: { type: Number, required: true },

        date: {
            type: Date,
            required: true,
        },

        status: {
            type: String,
            enum: ["Payé", "Non Payé"],
            default: "Payé",
        },


    },
    { timestamps: true }
);

module.exports = mongoose.model("Abonnement", abonnementSchema);
