const mongoose = require("mongoose");
const requestSchema = new mongoose.Schema(
    {
        calendar: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Calendar",
            required: true,
        },

        products: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        }],

        status: {
            type: String,
            enum: ["onHold", "approved", "refuesd"],
            default: "onHold",
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Vendeur",
        },

        createdAt: Date,
        updatedAt: Date,
    },
    { timestamps: true }
);

module.exports = mongoose.model("JoinRequest", requestSchema);
