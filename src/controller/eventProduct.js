const EventProduct = require("../models/eventProduct");

exports.createEventProduct = (req, res) => {
    //res.status(200).json( { file: req.files, body: req.body } );

    const {
        designation,
        prix,
        remise,
        prix_promo,
        stock_promo,
        createdBy
    } = req.body;

    const product = new EventProduct({
        createdBy: req.user._id,
        designation,
        prix,
        remise,
        prix_promo,
        stock_promo,

    });

    product.save((error, product) => {
        if (error) return res.status(400).json({ error });
        if (product) {
            res.status(201).json({ product });

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

exports.getEventProducts = async (req, res) => {
    const products = await EventProduct.find({ createdBy: req.user._id })
        .select(
            "_id designation prix nbr_vente remise prix_promo nbr_de_vue stock_promo"
        )
        .exec();

    res.status(200).json({ products });
};

//getAllProducts



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
