const Category = require("../../models/category");
const Product = require("../../models/product");
const Order = require("../../models/order");
const Commande = require("../../models/Commande");
const Coupon = require("../../models/coupon");
const Calendar = require("../../models/calendar");
const joinRequest = require("../../models/joinRequest");

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
      "_id createdAt status designation reference marque prix quantity slug description productPictures category couleur garantie minQuantity stock_moyen stock_initial stock_final nbr_de_vente enPromo promo dateDebutPromo dateFinPromo prix_promo taux_de_retour type poids ecran ram systemeExploitation processeur disqueDur metaTitle metaDesc url motCle graph smartTV withRecepteur ecranTactile normeHd resolution stockage capacite puissance vitesses matiere alimentation mode refroidissement volume classe largeur nbrFoyer pose ouverture taux_de_conversion nbr_de_vue quantite_vendue revenu best_price taux_rotation duree_stockage rec stock_recommande"
    )
    .populate({ path: "category", select: "_id name" })
    .exec();

  const coupons = await Coupon.find({ createdBy: req.user._id })
    .select(
      "_id produits titre description code remise limite status date_debut date_fin"
    )
    .populate({ path: "produits", select: "_id designation prix" })
    .exec();

  const joinRequests = await joinRequest.find({ createdBy: req.user._id })
    .select(
      "_id calendar products status"
    )
    .populate({ path: "products", select: "_id designation prix prix_promo stock_promo" })
    .populate({ path: "calendar", select: "_id nom date_debut date_fin caracteristique" })
    .exec();


  const calendars = await Calendar.find({})
    .select(
      "_id image nom date_debut date_fin fin_enregistrement caracteristique nbr_produits nbr_vendeurs status produits"
    )
    .exec();
  const orders = await Order.find({})
    .populate("items.productId", "name")
    .exec();

  const commandes = await Commande.find({})
    .select(
      "_id EtatDeLivraison num date_cmd marque ModeDePaiement StatutCmd montant slug  description"
    )
    .exec();

  const commanderetour = await Commande.find({})
    .select(
      "_id EtatDeLivraison motif num date_cmd marque ModeDePaiement StatutCmd montant slug description"
    )
    .find({ EtatDeLivraison: "retour" })
    .exec();

  const commandelivre = await Commande.find({})
    .select(
      "_id EtatDeLivraison num date_cmd marque ModeDePaiement montant StatutCmd slug description"
    )
    .find({ EtatDeLivraison: "livré" })
    .exec();

  const commandeEncours = await Commande.find({})
    .select(
      "_id EtatDeLivraison num date_cmd marque ModeDePaiement StatutCmd montant slug description"
    )
    .find({ EtatDeLivraison: "encours" })
    .exec();

  const commandeechec = await Commande.find({})
    .select(
      "_id EtatDeLivraison motif num  nom_client date_cmd marque ModeDePaiement StatutCmd montant slug description"
    )
    .find({ EtatDeLivraison: "echec" })
    .exec();

  const remboursements = await Commande.find({})
    .select(
      "_id EtatDeLivraison dateRemboursement montant num date_cmd marque ModeDePaiement StatutCmd slug description"
    )
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
    joinRequests
  });
};
