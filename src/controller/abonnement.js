const Abonnement = require("../models/abonnement");

exports.createAbonnement = (req, res) => {
    const {

        vendeur,

        montant,

        date,

        status,

    } = req.body;

    const abo = new Abonnement({
        vendeur: req.user._id,

        montant,

        date,

        status,
    });

    abo.save((error, abon) => {
        if (error) return res.status(400).json({ error });
        if (abon) {
            return res.status(201).json({ abon });
        }
    });
};

exports.getAbonnements = async (req, res) => {
    const abon = await Abonnement.find({ vendeur: req.user._id })
        .select("montant date status")
        //   .populate({ path: "product", select: "_id designation" })
        .exec();

    res.status(200).json({ abon });
};
