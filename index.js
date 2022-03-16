const express = require("express");
const useRouter = require("./routers/users");
const app = express();
const PORT = 4000;

const User = require("./models").user;
const TodoList = require("./models").todoList;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hi");
});

app.use("/users", useRouter);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
