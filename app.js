const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

// import models
const { sequelize, User, Post } = require("./models");
const users = require("./models/users");

const PORT = process.env.PORT || 3000;

const app = express();

// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(PORT, async () => {
  console.log(`Server running on ${process.env.NODE_ENV} mode in port ${PORT}`);
  await sequelize.authenticate();
  console.log("Database synced");
});

// Routes
// create a user
app.post("/users", async (req, res) => {
  const { name, email, password, role } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
    return res.json(user);
  } catch (err) {
    console.error(err);
    return res.status(400).json(err);
  }
});

// get all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.findAll();
    return res.json(users);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "Something went wrong" });
  }
});

// get a user
app.get("/users/:uuid", async (req, res) => {
  const { uuid } = req.params;
  try {
    const user = await User.findOne({
      where: { uuid },
      include: "posts",
    });
    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "Something went wrong" });
  }
});

// delete a post
app.delete("/users/:uuid", async (req, res) => {
  const { uuid } = req.params;

  try {
    const user = await User.findOne({ where: { uuid } });

    await user.destroy();

    return res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Something went wrong" });
  }
});

// update a user
app.put("/users/:uuid", async (req, res) => {
  const { uuid } = req.params;
  const { name, email, role } = req.body;
  try {
    const user = await User.findOne({ where: { uuid } });

    user.name = name;
    user.email = email;
    user.role = role;

    await user.save();

    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Something went wrong" });
  }
});

// create a post
app.post("/post", async (req, res) => {
  const { userUuid, body } = req.body;
  try {
    const user = await User.findOne({ where: { uuid: userUuid } });

    const post = await Post.create({ body, userId: user.id });

    return res.json(post);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Something went wrong" });
  }
});

// get all posts
app.get("/post", async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: "user",
    });

    return res.json(posts);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Something went wrong" });
  }
});
