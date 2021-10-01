const calendar = require("../models/calendar");
const Calendar = require("../models/calendar");

exports.createCalendar = (req, res) => {
  const {
    nom,
    caracteristique,
    nbr_produits,
    nbr_vendeurs,
    date_debut,
    date_fin,
    produits,
  } = req.body;

  //   let image = [];

  //   if (req.files.length > 0) {
  //     image = req.files.map((file) => {
  //       return { img: file.filename };
  //     });
  //   }

  var currentdate = new Date(date_debut);
  var month = currentdate.getMonth() + 1;
  var day = currentdate.getDate();
  var year = currentdate.getFullYear();
  var newdate = year + "-" + month + "-" + day;

  var currentdate1 = new Date(date_fin);
  var month1 = currentdate1.getMonth() + 1;
  var day1 = currentdate1.getDate();
  var year1 = currentdate1.getFullYear();
  var newdate1 = year1 + "-" + month1 + "-" + day1;

  var currentdate11 = new Date(date_debut);
  var month11 = currentdate11.getMonth() + 1;
  var day11 = currentdate11.getDate() - 15;
  var year11 = currentdate11.getFullYear();
  var newdate11 = year11 + "-" + month11 + "-" + day11;

  const new_date_debut = new Date(newdate);
  const new_date_fin = new Date(newdate1);
  const new_fin_enregistrement = new Date(newdate11);

  console.log(new_fin_enregistrement);

  var dateDebut = new Date(newdate11);
  var fin_enregistrement = new Date();
  fin_enregistrement.setDate(dateDebut.getDate() + dateDebut.getMonth());

  const cal = new Calendar({
    nom,
    date_debut: new_date_debut,
    date_fin: new_date_fin,
    fin_enregistrement: new_fin_enregistrement,
    caracteristique,
    nbr_produits,
    nbr_vendeurs,
    produits,
  });

  cal.save((error, calendar) => {
    if (error) return res.status(400).json({ error });
    if (calendar) {
      return res.status(201).json({ calendar, file: req.file });
    }
  });
};

exports.getCalendars = async (req, res) => {
  const calendar = await Calendar.find({})
    .select(
      "_id image nom date_debut date_fin fin_enregistrement caracteristique nbr_produits nbr_vendeurs status produits"
    )
    //   .populate({ path: "product", select: "_id designation" })
    .exec();

  res.status(200).json({ calendar });
};
