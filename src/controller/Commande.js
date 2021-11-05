const Commande = require("../models/Commande");

exports.CreateCommande = (req, res) => {
  const {
    num,
    date_cmd,
    ModeDePaiement,
    StatutCmd,
    EtatDeLivraison,
    DateLivraison,
    nom_client,
    tel_client,
    motif,
    destination,
    ENVOI_PAR,
    products,
    createdBy,
  } = req.body;

  const commande = new Commande({
    num,
    date_cmd,
    EtatDeLivraison,
    ModeDePaiement,
    StatutCmd,
    DateLivraison,
    nom_client,
    tel_client,
    motif,
    destination,
    ENVOI_PAR,
    createdBy: req.user._id,
    products,
  });

  commande.save((error, Commande) => {
    if (error) return res.status(400).json({ error });
    if (Commande) {
      res.status(201).json({ Commande });
    }
  });
};
exports.getProductsBySlug = (req, res) => {
  const { slug } = req.params;
  Category.findOne({ slug: slug })
    .select("_id type")
    .exec((error, category) => {
      if (error) {
        return res.status(400).json({ error });
      }
      if (category) {
        Product.find({ category: category._id }).exec((error, products) => {
          if (error) {
            return res.status(400).json({ error });
          }

          if (category.type) {
            if (products.length > 0) {
              res.status(200).json({
                products,
                priceRange: {
                  under5k: 5000,
                  under10k: 10000,
                  under15k: 15000,
                  under20k: 20000,
                  under30k: 30000,
                },
                productsByPrice: {
                  under5k: products.filter((product) => product.price <= 5000),
                  under10k: products.filter(
                    (product) => product.price > 5000 && product.price <= 10000
                  ),
                  under15k: products.filter(
                    (product) => product.price > 10000 && product.price <= 15000
                  ),
                  under20k: products.filter(
                    (product) => product.price > 15000 && product.price <= 20000
                  ),
                  under30k: products.filter(
                    (product) => product.price > 20000 && product.price <= 30000
                  ),
                },
              });
            }
          } else {
            res.status(200).json({ products });
          }
        });
      }
    });
};

exports.getAllRequests = async (req, res) => {
  const allRequests = await JoinRequest.find({ createdBy: req.user._id })
    .select("_id calendar products status")
    .populate({
      path: "products",
      select:
        "_id designation prix prix_promo stock_promo category quantityCommande taux ",
    })
    .populate({
      path: "calendar",
      select: "_id nom date_debut date_fin caracteristique",
    })
    .exec();
  res.status(200).json({ allRequests });
};

exports.getCommande = async (req, res) => {
  const Commandes = await Commande.find({ createdBy: req.user._id })
    .select(
      "_id num date_cmd EtatDeLivraison ModeDePaiement StatutCmd DateLivraison ref_produit nom_prod nom_client products tel_client motif montant"
    )
    .populate({
      path: "products",
      select:
        "_id designation prix prix_promo stock_promo category quantityCommande taux ",
    })
    .exec();

  res.status(200).json({ Commandes });
};
exports.getCommanderetour = async (req, res) => {
  const Commandes = await Commande.find({ createdBy: req.user._id })
    .select(
      "_id num date_cmd EtatDeLivraison ModeDePaiement StatutCmd DateLivraison ref_produit nom_prod nom_client tel_client motif montant"
    )
    .populate({
      path: "products",
      select:
        "_id designation prix prix_promo stock_promo category quantityCommande taux ",
    })
    .exec();

  res.status(200).json({ Commandes });
};
