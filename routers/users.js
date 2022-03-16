const { Router } = require("express");
const Users = require("../models").user;

const router = new Router();

router.get("/", async (req, res) => {
  try {
    const allUsers = await Users.findAll({ order: ["id"] });
    if (!allUsers) {
      res.status(404).send("No users found!");
    } else {
      res.send(allUsers);
    }
  } catch (error) {
    console.log(error.message);
    next(error);
  }
});

// Create a new user account
router.post("/", async (req, res, next) => {
  try {
    const email = req.body.email;
    if (!email || email === " ") {
      res.status(400).send("Please provide an email");
    } else {
      const user = await Users.create(req.body);
      res.send(user);
    }
  } catch (error) {
    console.log(error.message);
    next(error);
  }
});

// Get a user's information
router.get("/:userId", async (req, res, next) => {
  try {
    const userByPk = await Users.findByPk(req.params.userId);

    if (!userByPk) {
      res.status(400).send(
        `The user with the user id:${req.params.userId} 
          doesnt exist! Please provide another one`
      );
    } else {
      res.send(userByPk);
    }
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
    if (!userByPk) {
      res.status(400).send(
        `The user with the user id:${userId} 
          doesnt exist! Please provide another one`
      );
    } else {
      const updatedUser = await userByPk.update({ name, password });
      res.send(updatedUser);
    }
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
