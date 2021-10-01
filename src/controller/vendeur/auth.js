const User = require("../../models/vendeur");
const jwt = require("jsonwebtoken");
//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
const bcrypt = require("bcrypt");
const shortid = require("shortid");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const sendgridTransport = require("nodemailer-sendgrid-transport");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        "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",
    },
  })
);
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
        transporter.sendMail({
          to: req.body.email,
          from: "ali.bensaid@esprit.tn",
          subject: "signup success",
          html: "<h1> welcome to Jungle </h1> ",
        });
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

exports.resetPass = (req, res) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
    }
    const token = buffer.toString("hex");
    User.findOne({ email: req.body.email }).then((user) => {
      if (!user) {
        return res
          .status(422)
          .json({ error: "Userx dont exists with that email" });
      }
      user.resetToken = token;
      user.expireToken = Date.now() + 3600000;
      console.log("my token", token);
      user.save().then((result) => {
        // transporter.sendMail({
        //   to: user.email,

        //   from: "no-replay@insta.com",
        //   subject: "password reset",
        //   html: `
        //           <p>You requested for password reset</p>
        //           <h5>click in this <a href="">link</a> to reset password</h5>
        //           `,
        // });

        transporter.sendMail({
          to: req.body.email,
          from: "ali.bensaid@esprit.tn",
          subject: "reset pass",
          html: `<h5>click in this <a href="${token}">link</a> to reset password</h5>`,
        });
        res.json({ message: "check your email" });
      });
    });
  });
};

exports.Newpass = (req, res) => {
  const newPassword = req.body.password;
  const sentToken = req.body.token;
  User.findOne({ resetToken: sentToken, expireToken: { $gt: Date.now() } })
    .then((user) => {
      if (!user) {
        return res.status(422).json({ error: "Try again session expired" });
      }
      bcrypt.hash(newPassword, 12).then((hashedpassword) => {
        user.password = hashedpassword;
        user.resetToken = undefined;
        user.expireToken = undefined;
        user.save().then((saveduser) => {
          res.json({ message: "password updated success" });
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
