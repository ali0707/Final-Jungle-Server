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
            ref: "eventProduct",
            required: true,
        }],

        createdAt: Date,
        updatedAt: Date,
    },
    { timestamps: true }
);

module.exports = mongoose.model("JoinRequest", requestSchema);
