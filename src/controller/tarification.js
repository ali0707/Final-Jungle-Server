const Tarif = require("../models/tarification");

exports.CreateTarif = (req, res) => {
  const { num, categories, taux, createdBy } = req.body;

  const tarif = new Tarif({
    num,
    categories,
    taux,
    createdBy,
    createdBy: req.user._id,
  });

  tarif.save((error, tarif) => {
    if (error) return res.status(400).json({ error });
    if (tarif) {
      res.status(201).json({ tarif, files: req.files });
    }
  });
};

exports.getTarif = async (req, res) => {
  const tarifs = await Tarif.find({}).select(" num categories taux").exec();

  res.status(200).json({ tarifs });
};
