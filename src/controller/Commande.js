const Commande = require("../models/Commande");

exports.CreateCommande = (req, res) => {
  const {
    num,
    date_cmd,
    ModeDePaiement,
    StatutCmd,
    EtatDeLivraison,
    DateLivraison,
    ref_produit,
    nom_prod,
    nom_client,
    tel_client,
    montant,
    motif,
    Qte,
    destination,
    prix_promo,
    createdBy,
  } = req.body;

  const commande = new Commande({
    num,
    date_cmd,
    EtatDeLivraison,
    ModeDePaiement,
    createdBy: req.user._id,
    StatutCmd,
    DateLivraison,
    ref_produit,
    nom_prod,
    nom_client,
    tel_client,
    motif,
    montant,
    Qte,
    destination,
    prix_promo,
    createdBy,
  });

  commande.save((error, commande) => {
    if (error) return res.status(400).json({ error });
    if (commande) {
      res.status(201).json({ commande, files: req.files });
    }
  });
};

exports.getCommande = async (req, res) => {
  const Commandes = await Commande.find({})
    .select
    // "_id num date_cmd EtatDeLivraison ModeDePaiement StatutCmd DateLivraison ref_produit nom_prod nom_client tel_client motif montant"
    ()
    .exec();

  res.status(200).json({ Commandes });
};
exports.getCommanderetour = async (req, res) => {
  const Commandes = await Commande.find({})
    .select(
      "_id num date_cmd EtatDeLivraison ModeDePaiement StatutCmd DateLivraison ref_produit nom_prod nom_client tel_client motif montant"
    )
    .exec();

  res.status(200).json({ Commandes });
};
