const express = require("express");
require("dotenv").config();
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");
const passport=require("passport");
const cors=require("cors");

require("./middleware/passport")(passport);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Succefully"))
  .catch((err) => console.log(err));

const app = express();

app.use(cors())
app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error=req.flash("error");
  next();
});
app.use("/", require("./routes/main"));
app.use("/users", require("./routes/users"));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server listining on port ${PORT}`);
});
