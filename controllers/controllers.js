const User = require("../models/user");
const bcrypt = require("bcryptjs");

const Login = (req, res) => {
  res.render("login");
};

const GetRegister = (req, res) => {
  res.render("register");
};

const PostRegister = async (req, res) => {
  const { name, email, password, password2 } = req.body;
  const errors = [];
  if (!name || !email || !password || !password2) {
    errors.push({ msg: "Please fill in all fields" });
  }
  if (password !== password2) {
    errors.push({ msg: "Passwords do not match" });
  }
  if (password.length < 6) {
    errors.push("Password Length Should Be 6 Characters At Least");
  }
  if (errors.length > 0) {
    res.render("register", {
      errors,
      name,
      email,
      password,
      password2,
    });
  } else {
    const user = await User.findOne({ email });
    if (user) {
      errors.push({ msg: "This Email Is Already registered" });
      res.render("register", {
        errors,
        name,
        email,
        password,
        password2,
      });
    } else {
      const newUser = await User.create({
        name,
        email,
        password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
      });
      console.log(newUser);
      req.flash("success_msg","You are now registered")
      res.redirect("/users/login");
    }
  }
};

const Main = (req, res) => {
  res.render("welcome");
};

module.exports = {
  Login,
  GetRegister,
  Main,
  PostRegister,
};
