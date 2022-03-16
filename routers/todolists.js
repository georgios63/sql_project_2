const { Router } = require("express");
const TodoLists = require("../models").todoList;
const Users = require("../models").user;

const router = new Router();

// get all lists
router.get("/todoLists", async (req, res, next) => {
  try {
    const allLists = await TodoLists.findAll({ order: ["id"] });
    if (!allLists) {
      res.status(404).send("No users found!");
    } else {
      res.send(allLists);
    }
  } catch (error) {
    console.log(error.message);
    next(error);
  }
});

//get a list based on id

router.get("/todoLists/:listId", async (req, res, next) => {
  try {
    const listBasedOnId = await TodoLists.findByPk(req.params.listId);
    if (!listBasedOnId)
      return res.status(400)
        .send(`The list with the list id:${req.params.listId} 
          doesnt exist! Please provide another one`);

    res.send(listBasedOnId);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
});

//create a new list

router.post("/todoLists", async (req, res, next) => {
  try {
    const { name, userId } = req.body;

    if (!name || name === " " || !userId) {
      return res.status(400).send("Please provide a name");
    }

    const user = await Users.findByPk(req.body.userId);
    if (!user) return res.status(404).send("User doesnt exist");

    const todoList = await TodoLists.create({
      name,
      userId,
    });

    res.send(todoList);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
});

//update a list

//delete a list

module.exports = router;
