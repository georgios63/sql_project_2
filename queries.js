const User = require("./models").user;
const TodoItem = require("./models").todoItem;

const getUsers = async () => {
  try {
    const allUsers = await User.findAll({ order: ["id"] });
    return allUsers.map((u) => {
      return u.get({ plain: true });
    });
  } catch (error) {
    console.log(error.message);
  }
};

getUsers().then((users) => console.log(users));

const getTodoItems = async () => {
  try {
    const allTodoItems = await TodoItem.findAll();
    return allTodoItems.map((item) => {
      return item.get({ plain: true });
    });
  } catch (error) {
    console.log(error.message);
  }
};

// getTodoItems().then((items) => console.log(items));

const getUserByPk = async () => {
  try {
    const userByPk = await User.findByPk(1);
    return userByPk.get({ plain: true });
  } catch (error) {
    console.log(error.message);
  }
};

// getUserByPk().then((userById) => console.log(userById));

const createUser = async ({ name, email, phone }) => {
  try {
    const newUser = await User.create({ name, email, phone });
    return newUser.get({ plain: true });
  } catch (error) {
    console.log(error.message);
  }
};

// createUser({
//   name: "Franc",
//   email: "franc@gmail.com",
//   phone: "374673647",
// }).then((createUser) => console.log(createUser));

const findImportant = async () => {
  try {
    const impItems = await TodoItem.findAll({ where: { important: true } });
    return impItems.map((item) => item.get({ plain: true }));
  } catch (error) {
    console.log(error);
  }
};

// findImportant().then((impItem) => console.log(impItem));
