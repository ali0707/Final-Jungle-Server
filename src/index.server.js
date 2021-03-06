const express = require("express");
const env = require("dotenv");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

//routes
const authRoutes = require("./routes/auth");
const vendeurAuthRoutes = require("./routes/vendeur/auth");
// const adminRoutes = require("./routes/admin/auth");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
const initialDataRoutes = require("./routes/vendeur/initialData");
const pageRoutes = require("./routes/admin/page");
const addressRoutes = require("./routes/address");
const orderRoutes = require("./routes/order");
const CommandeRoutes = require("./routes/Commande");
const TarificationRoutes = require("./routes/tarification");

const adminOrderRoute = require("./routes/admin/order.routes");
const couponRoutes = require("./routes/coupon");
const calendarRoute = require("./routes/calendar");
const eventProductRoute = require("./routes/eventProduct");
const joinRequestRoute = require("./routes/joinRequest");
const AbonnementRoutes = require("./routes/abonnement");

//environment variable or you can say constants
env.config();

// mongodb connection
//mongodb+srv://root:<password>@cluster0.8pl1w.mongodb.net/<dbname>?retryWrites=true&w=majority
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.uuwhg.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => {
    console.log("Database connected");
  });

app.use(cors());
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "uploads")));
app.use("/api", authRoutes);
app.use("/api", vendeurAuthRoutes);
// app.use("/api", adminRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", cartRoutes);
app.use("/api", initialDataRoutes);
app.use("/api", pageRoutes);
app.use("/api", addressRoutes);
app.use("/api", orderRoutes);
app.use("/api", CommandeRoutes);
app.use("/api", adminOrderRoute);
app.use("/api", couponRoutes);
app.use("/api", calendarRoute);
app.use("/api", eventProductRoute);
app.use("/api", joinRequestRoute);
app.use("/api", TarificationRoutes);
app.use("/api", AbonnementRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
