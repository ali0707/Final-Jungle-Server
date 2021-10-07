const Product = require("../models/product");
const shortid = require("shortid");
const slugify = require("slugify");
const Category = require("../models/category");

exports.createProduct = (req, res) => {
  //res.status(200).json( { file: req.files, body: req.body } );

  const {
    designation,
    reference,
    createdBy,
    marque,
    couleur,
    garantie,
    quantity,
    minQuantity,
    prix,
    enPromo,
    promo,
    dateDebutPromo,
    dateFinPromo,
    prix_promo,
    description,
    category,
    status,
    taux_de_retour,
    type,
    poids,
    ecran,
    ram,
    systemeExploitation,
    processeur,
    disqueDur,
    metaTitle,
    metaDesc,
    url,
    motCle,
    //
    graph,
    //
    smartTV,
    withRecepteur,
    ecranTactile,
    normeHd,
    resolution,
    //
    stockage,
    capacite,
    puissance,
    vitesses,
    matiere,
    alimentation,
    mode,
    refroidissement,
    volume,
    classe,
    largeur,
    nbrFoyer,
    pose,
    ouverture,
    //stat
    taux_de_conversion,
    nbr_de_vue,
    quantite_vendue,
    revenu,
    best_price,
    taux_rotation,
    duree_stockage,
    stock_recommande,
    nbr_de_vente,
    stock_initial,
    stock_final,
    stock_moyen,
  } = req.body;

  let productPictures = [];

  // if (req.files) {
  //   productPictures = req.files.map((file) => {
  //     return { img: file.filename };
  //   });
  // }

  if (req.files.length > 0) {
    productPictures = req.files.map((file) => {
      return { img: file.filename, test: file.location };
    });
  }

  const product = new Product({
    slug: slugify(designation) + shortid.generate(),
    createdBy: req.user._id,
    designation,
    reference,
    marque,
    couleur,
    garantie,
    quantity,
    minQuantity,
    prix,
    enPromo,
    promo,
    dateDebutPromo,
    dateFinPromo,
    prix_promo,
    description,
    category,
    status,
    taux_de_retour,
    type,
    poids,
    ecran,
    ram,
    systemeExploitation,
    processeur,
    disqueDur,
    metaTitle,
    metaDesc,
    url,
    motCle,
    productPictures,
    graph,
    //
    smartTV,
    withRecepteur,
    ecranTactile,
    normeHd,
    resolution,
    //
    stockage,
    capacite,
    puissance,
    vitesses,
    matiere,
    alimentation,
    mode,
    refroidissement,
    volume,
    classe,
    largeur,
    nbrFoyer,
    pose,
    ouverture,

    //stat
    taux_de_conversion,
    nbr_de_vue,
    quantite_vendue,
    revenu,
    best_price,
    taux_rotation,
    duree_stockage,
    stock_recommande,
    nbr_de_vente,
    stock_initial,
    stock_final,
    stock_moyen,
  });

  product.save((error, product) => {
    if (error) return res.status(400).json({ error });
    if (product) {
      res.status(201).json({ product, files: req.file });
      console.log(`User Id ${product.createdBy}`);
      console.log(`test to img Id ${product.productPictures}`);
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

exports.getProductDetailsById = (req, res) => {
  const { productId } = req.params;
  if (productId) {
    Product.findOne({ _id: productId }).exec((error, product) => {
      if (error) return res.status(400).json({ error });
      if (product) {
        res.status(200).json({ product });
      }
    });
  } else {
    return res.status(400).json({ error: "Params required" });
  }
};

// new update
exports.deleteProductById = (req, res) => {
  const { productId } = req.body.payload;
  if (productId) {
    Product.deleteOne({ _id: productId }).exec((error, result) => {
      if (error) return res.status(400).json({ error });
      if (result) {
        res.status(202).json({ result });
      }
    });
  } else {
    res.status(400).json({ error: "Params required" });
  }
};

exports.getProducts = async (req, res) => {
  const products = await Product.find({ createdBy: req.user._id })
    .select(
      "_id createdAt status designation reference marque prix quantity slug description productPictures category couleur garantie minQuantity nbr_de_vente enPromo promo dateDebutPromo dateFinPromo prix_promo taux_de_retour type poids ecran ram systemeExploitation processeur disqueDur metaTitle metaDesc url motCle graph smartTV withRecepteur ecranTactile normeHd resolution stockage capacite puissance vitesses matiere alimentation mode refroidissement volume classe largeur nbrFoyer pose ouverture taux_de_conversion nbr_de_vue quantite_vendue revenu best_price taux_rotation duree_stockage stock_recommande"
    )
    .populate({ path: "category", select: "img name" })
    .exec();

  res.status(200).json({ products });
};

//getAllProducts

function createProductsList(products) {
  const productsList = [];
  let product;

  for (let prod of product) {
    productsList.push({
      _id: prod._id,
      designation: prod.designation,
    });
  }

  return categoryList;
}

//update product
exports.updateProduct = async (req, res, next) => {
  const newUserData = {
    designation: req.body.designation,
    reference: req.body.reference,
    marque: req.body.marque,
    quantity: req.body.quantity,
    prix: req.body.prix,
    description: req.body.description,
    couleur: req.body.couleur,
    enPromo: req.body.enPromo,
    promo: req.body.promo,
    prix_promo: req.body.prix_promo,
    dateDebutPromo: req.body.dateDebutPromo,
    dateFinPromo: req.body.dateFinPromo,
    _id: req.body._id,
  };
  console.log(req.body._id);

  const product = await Product.findByIdAndUpdate(req.body._id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    message: "your product has been updated!",
  });
};
