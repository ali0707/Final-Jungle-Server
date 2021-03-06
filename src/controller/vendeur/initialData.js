const Category = require("../../models/category");
const Product = require("../../models/product");
const Order = require("../../models/order");
const Commande = require("../../models/Commande");
const Coupon = require("../../models/coupon");
const Calendar = require("../../models/calendar");
const joinRequest = require("../../models/joinRequest");
const Tarif = require("../../models/tarification");
const Abonnement = require("../../models/abonnement");

function createCategories(categories, parentId = null) {
  const categoryList = [];
  let category;
  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == undefined);
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }

  for (let cate of category) {
    categoryList.push({
      _id: cate._id,
      name: cate.name,
      slug: cate.slug,
      parentId: cate.parentId,
      type: cate.type,
      taux: cate.taux,
      children: createCategories(categories, cate._id),
    });
  }

  return categoryList;
}

exports.initialData = async (req, res) => {
  const categories = await Category.find({}).exec();

  const allProducts = await Product.find({})
    .select("_id reference prix designation")
    .exec();

  const products = await Product.find({ createdBy: req.user._id })
    .select(
      "_id createdAt status designation reference marque prix quantity stock_promo slug description productPictures category couleur garantie minQuantity stock_moyen stock_initial stock_final nbr_de_vente enPromo promo dateDebutPromo dateFinPromo prix_promo taux_de_retour type poids ecran ram systemeExploitation processeur disqueDur metaTitle metaDesc url motCle graph smartTV withRecepteur ecranTactile normeHd resolution stockage capacite puissance vitesses matiere alimentation mode refroidissement volume classe largeur nbrFoyer pose ouverture taux_de_conversion nbr_de_vue quantite_vendue revenu best_price taux taux_rotation duree_stockage rec stock_recommande quantityCommande"
    )
    .populate({ path: "category", select: "_id name taux parentId" })
    .exec();

  const coupons = await Coupon.find({ createdBy: req.user._id })
    .select(
      "_id produits titre description code remise limite status date_debut date_fin"
    )
    .populate({ path: "produits", select: "_id designation prix" })
    .exec();

  const abonnements = await Abonnement.find({ vendeur: req.user._id })
    .select("_id montant date status vendeur")
    .populate({ path: "vendeur", select: "_id firstName lastName" })
    .exec();

  const joinRequests = await joinRequest
    .find()
    .select("_id calendar products status")
    .populate({
      path: "products",
      select:
        "_id designation reference prix prix_promo stock_promo nbr_de_vente nbr_de_vue",
    })
    .populate({
      path: "calendar",
      select: "_id nom date_debut date_fin caracteristique",
    })
    .exec();

  const myJoinRequests = await joinRequest
    .find({ createdBy: req.user._id })
    .select("_id calendar products status")
    .populate({
      path: "products",
      select:
        "_id designation reference prix prix_promo stock_promo nbr_de_vente nbr_de_vue",
    })
    .populate({
      path: "calendar",
      select: "_id nom date_debut date_fin caracteristique",
    })
    .exec();

  const tarifs = await Tarif.find({ createdBy: req.user._id })
    .select(" num categories taux")
    .populate({
      path: "products",
      select:
        "_id designation prix prix_promo stock_promo quantity category quantityCommande taux ",
    })

    .exec();

  const calendars = await Calendar.find({})
    .select(
      "_id image nom date_debut date_fin fin_enregistrement caracteristique nbr_produits nbr_vendeurs status produits"
    )
    .exec();
  const orders = await Order.find({})
    .populate("items.productId", "name")
    .exec();

  const commandes = await Commande.find({ createdBy: req.user._id })
    .select(
      "_id EtatDeLivraison num date_cmd marque ModeDePaiement StatutCmd montant ENVOI_PAR prix_promo destination Qte  nom_client tel_client nom_prod  ref_produit DateLivraison slug  description "
    )
    .populate({
      path: "products",
      select:
        "_id designation prix prix_promo stock_promo quantity category quantityCommande taux  reference",
    })

    .exec();

  const commanderetour = await Commande.find({ createdBy: req.user._id })
    .select(
      "_id EtatDeLivraison motif num date_cmd marque ModeDePaiement StatutCmd montant ENVOI_PAR prix_promo destination Qte  nom_client tel_client nom_prod  ref_produit DateLivraison slug  description"
    )
    .populate({
      path: "products",
      select:
        "_id designation prix prix_promo stock_promo quantity category quantityCommande taux reference ",
    })
    .find({ EtatDeLivraison: "retour" })
    .exec();

  const commandelivre = await Commande.find({ createdBy: req.user._id })
    .select(
      "_id EtatDeLivraison motif num date_cmd marque ModeDePaiement StatutCmd montant ENVOI_PAR prix_promo destination Qte nom_client tel_client nom_prod ref_produit DateLivraison slug  description"
    )
    .populate({
      path: "products",
      select:
        "_id designation prix prix_promo stock_promo quantity category quantityCommande taux reference ",
    })
    .populate({
      path: "category",
      select: "_id name taux ",
    })
    .find({ EtatDeLivraison: "livr??" })
    .exec();

  const livres = await Commande.find({})
    .select(
      "_id EtatDeLivraison motif num date_cmd marque ModeDePaiement StatutCmd montant ENVOI_PAR prix_promo destination Qte nom_client tel_client nom_prod ref_produit DateLivraison slug  description"
    )
    .populate({
      path: "products",
      select:
        "_id designation prix prix_promo stock_promo quantity category quantityCommande taux reference ",
    })
    .populate({
      path: "category",
      select: "_id name taux ",
    })
    .exec();

  const commandeEncours = await Commande.find({ createdBy: req.user._id })
    .select(
      "_id EtatDeLivraison motif num date_cmd marque ModeDePaiement StatutCmd montant ENVOI_PAR prix_promo destination Qte  nom_client tel_client nom_prod  ref_produit DateLivraison slug  description"
    )
    .populate({
      path: "products",
      select:
        "_id designation prix prix_promo stock_promo quantity category quantityCommande taux reference ",
    })
    .find({ EtatDeLivraison: "encours" })
    .exec();

  const commandeechec = await Commande.find({ createdBy: req.user._id })
    .select(
      "_id EtatDeLivraison motif num date_cmd marque ModeDePaiement StatutCmd montant ENVOI_PAR prix_promo destination Qte  nom_client tel_client nom_prod  ref_produit DateLivraison slug  description"
    )
    .populate({
      path: "products",
      select:
        "_id designation prix prix_promo stock_promo quantity category quantityCommande taux reference ",
    })
    .find({ EtatDeLivraison: "echec" })
    .exec();

  const remboursements = await Commande.find({ createdBy: req.user._id })
    .select(
      "_id EtatDeLivraison motif num date_cmd marque ModeDePaiement StatutCmd montant ENVOI_PAR prix_promo destination Qte  nom_client tel_client nom_prod  ref_produit DateLivraison slug  description"
    )
    .populate({
      path: "products",
      select:
        "_id designation prix prix_promo stock_promo quantity category quantityCommande taux  reference",
    })
    .find({ EtatDeLivraison: "remboursement" })
    .exec();

  res.status(200).json({
    allProducts,
    categories: createCategories(categories),
    products,
    coupons,
    orders,
    commandes,
    commandeEncours,
    commandeechec,
    commanderetour,
    commandelivre,
    remboursements,
    calendars,
    joinRequests,
    tarifs,
    myJoinRequests,
    abonnements,
    livres,
  });
};
