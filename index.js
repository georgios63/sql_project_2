const express = require("express");
const app = express();
const PORT = 4000;

const User = require("./models").user;

app.use(express.json());

app.get("/users", async (req, res) => {
  try {
    const allUsers = await User.findAll({ order: ["id"] });
    res.send(allUsers);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
});

// Create a new user account
app.post("/users", async (req, res, next) => {
  try {
    const email = req.body.email;
    if (!email || email === " ") {
      res.status(400).send("Please provide an email");
    } else {
      const user = await User.create(req.body);
      res.send(user);
    }
  } catch (error) {
    console.log(error.message);
    next(error);
  }
});

// Get a user's information
app.get("/users/:id", async (req, res, next) => {
  try {
    const userByPk = await User.findByPk(req.params.id);
    res.send(userByPk);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
});

// Update a user's information
app.put("/users/:id", (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// Get all user's tasks
app.get("/users/:userId/lists", (req, res, next) => {
  /*..*/
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
