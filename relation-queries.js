const User = require("./models").user;
const TodoItem = require("./models").todoItem;
const TodoList = require("./models").todoList;

const listsWithUsers = async () => {
  try {
    const lists = await TodoList.findAll({ include: [User] });
    return lists.map((list) => list.toJson());
  } catch (error) {
    console.log(error);
  }
};

listsWithUsers().then((lists) => console.log(lists));
