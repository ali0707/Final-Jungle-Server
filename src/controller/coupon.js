const Coupon = require("../models/coupon");
const slugify = require("slugify");

exports.createCoupon = (req, res) => {
  //res.status(200).json( { file: req.files, body: req.body } );

  const couponObj = {
    titre: req.body.titre,
    description: req.body.description,
    remise: req.body.remise,
    limite: req.body.limite,
    date_debut: req.body.date_debut,
    date_fin: req.body.date_fin,
    code: req.body.code,
    produits: req.body.produits,
    createdBy: req.user._id,
  };
  let test = [];
  if (req.body.produits.length > 0) {
    test = req.body.produits.map((produit) => {
      return { test: produit.designation };
    });
  }

  const cat = new Coupon(couponObj);

  cat.save((error, coupon) => {
    if (error) return res.status(400).json({ error });
    if (coupon) {
      res.status(201).json({ coupon });
      console.log(`User Id ${coupon.createdBy}`);
      console.log(`User  test ${coupon.produits}`);
    }
  });
};

exports.getCoupons = async (req, res) => {
  const coupons = await Coupon.find({ createdBy: req.user._id })

    .select(
      "_id titre description remise limite date_debut date_fin produits test"
    )
    .populate({ path: "produits", select: "_id designation prix" })

    .exec();

  res.status(200).json({ coupons });
};

exports.updateCoupon = async (req, res) => {
  const coupon = await Coupon.find({ _id: req._id })

    .select("_id status")

    .populate({ path: "produits", select: "_id designation" })

    .exec();

  res.status(200).json({ coupons });
};
