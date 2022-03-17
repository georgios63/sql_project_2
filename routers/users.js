const { Router } = require("express");
const Users = require("../models").user;
const TodoLists = require("../models").todoList;

const router = new Router();

router.get("/", async (req, res, next) => {
  try {
    const allUsers = await Users.findAll({ order: ["id"] });

    if (!allUsers) return res.status(404).send("No users found!");

    res.send(allUsers);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
});

// Create a new user
router.post("/", async (req, res, next) => {
  try {
    const email = req.body.email;
    if (!email || email === " ")
      return res.status(400).send("Please provide an email");

    const user = await Users.create(req.body);

    res.send(user);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
});

// Get a user's information
router.get("/:userId", async (req, res, next) => {
  try {
    const userByPk = await Users.findByPk(req.params.userId);

    if (!userByPk)
      return res.status(400).send(
        `The user with the user id:${req.params.userId} 
          doesnt exist! Please provide another one`
      );

    res.send(userByPk);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
});

// Update a user's information
router.put("/:userId", async (req, res, next) => {
  try {
    const { name, password } = req.body;
    const { userId } = req.params;

    const userByPk = await Users.findByPk(userId);
    if (!userByPk)
      return res.status(400).send(
        `The user with the user id:${userId} 
          doesnt exist! Please provide another one`
      );

    const updatedUser = await userByPk.update({ name, password });

    res.send(updatedUser);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
});

//get all lists from a user
router.get("/:userId/lists", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const listByPk = await TodoLists.findAll({ where: { userId } });

    console.log(listByPk);

    if (listByPk.length <= 0)
      return res
        .status(404)
        .send(`There are no todo lists for the user with id ${userId}`);

    res.send(listByPk);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
});

// Delete a user based on id
router.delete("/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await Users.findByPk(userId);

    if (!user) {
      res.status(400).send(`The user with the user id:${userId} 
          doesnt exist! Please provide another one`);
    } else {
      const deleteUser = await user.destroy();
      res.send(deleteUser);
    }
  } catch (error) {
    console.log(error.message);
    next(error);
  }
});

module.exports = router;
