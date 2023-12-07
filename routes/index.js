var express = require("express");
var router = express.Router();
const userModel = require("./users");
const postModel = require("./post");
const passport = require("passport");

const localStrategy = require("passport-local");
passport.authenticate(new localStrategy(userModel.authenticate()));

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/alluserposts", async function (req, res, next) {
  let user = await userModel
    .findOne({
      _id: "656cc153e64be7f3c7530460",
    })
    .populate();

  res.send(user);
});

router.get("/createuser", async function (req, res, next) {
  let createduser = await userModel.create({
    username: "Amit",
    password: "Amit",
    posts: [],
    email: "amit@gmail.com",
    fullname: "Amit Nandan",
  });

  res.send(createduser);
});

router.get("/createpost", async function (req, res, next) {
  let createdpost = await postModel.create({
    postText: "Hello Everyone",
    user: "656cc153e64be7f3c7530460",
  });

  let user = await userModel.findOne({
    _id: "",
  });
  user.posts.push(createdpost._id);
  await user.save();
  res.send("done");
  res.send(createdpost);
});

router.get("/profile", function (req, res, next) {
  res.send("profile");
});

router.post("/register", function (req, res) {
  const userData = new userModel({
    username: req.body.username,
    email: req.body.email,
    fullname: req.body.fullname,
  });

  userModel.register(userData, req.body.password).then(function () {
    passport.authenticate("local")(req, res, function () {
      res.redirect("/profile");
    });
  });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/",
  }),
  function (req, res) {}
);

router.get("/logout", function (req, res) {
  req.logOut(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

function isLoggedIn(req, res, next) {
  {
    if (req.isAuthenticated()) return next();
    res.redirect("/");
  }
}

module.exports = router;
