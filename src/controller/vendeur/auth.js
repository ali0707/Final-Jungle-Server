const User = require("../../models/vendeur");
const jwt = require("jsonwebtoken");

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (user)
      return res.status(400).json({
        message: "Vendeur existe déja",
      });

    const {
      firstName,
      lastName,
      email,
      password,
      nomBoutique,
      phoneNumber,

      matriculeFiscale,
      identifiantUnique,
      raisonSociale,
      codePostale,
      adresse,

      nomBanque,
      titulaireCompte,
      RIB,

      comment,
      cin,
      registre,
      patente,
    } = req.body;

    const _user = new User({
      firstName,
      lastName,
      email,
      password,
      nomBoutique,
      phoneNumber,

      matriculeFiscale,
      identifiantUnique,
      raisonSociale,
      codePostale,
      adresse,

      nomBanque,
      titulaireCompte,
      RIB,

      comment,
      cin,
      registre,
      patente,
    });

    _user.save((error, data) => {
      if (error) {
        return res.status(400).json({
          message: error,
        });
      }

      if (data) {
        return res.status(201).json({
          //user:data
          message: "Vendeur created successfully",
        });
      }
    });
  });
};

exports.signin = (req, res) => {
  User.findOne(
    { email: req.body.email } || { phoneNumber: req.body.phoneNumber }
  ).exec(async (error, user) => {
    if (error) return res.status(400).json(error);
    if (user) {
      const isPassword = await user.authentificate(req.body.password);
      if (isPassword && user.role === "vendeur") {
        const token = jwt.sign(
          { _id: user._id, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );
        const {
          _id,
          firstName,
          lastName,
          email,
          password,
          nomBoutique,
          phoneNumber,
          raisonSociale,
          matriculeFiscale,
          adresse,
          codePostale,
          titulaireCompte,
          RIB,
          nomBanque,
          identifiantUnique,
          comment,
          cin,
          registre,
          patente,
        } = user;
        res.cookie("token", token, { expiresIn: "1d" });
        res.status(200).json({
          token,
          user: {
            _id,
            firstName,
            lastName,
            email,
            password,
            nomBoutique,
            phoneNumber,
            raisonSociale,
            matriculeFiscale,
            adresse,
            codePostale,
            titulaireCompte,
            RIB,
            nomBanque,
            identifiantUnique,
            comment,
            cin,
            registre,
            patente,
          },
        });
      } else {
        return res.status(400).json({
          message: "Invalid Password",
        });
      }
    } else {
      return res.status(400).json({
        message: "Something went wrong ",
      });
    }
  });
};

exports.getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  res.status(200).json({
    success: true,
    user,
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "Signout successfully...!",
  });
};
