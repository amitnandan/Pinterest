var express = require("express");
var router = express.Router();
const userModel = require("./users");
const postModel = require("./post");

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

module.exports = router;
