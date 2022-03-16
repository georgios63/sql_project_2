const express = require("express");
const userRouter = require("./routers/users");
const todoListRouter = require("./routers/todolists");

const app = express();
const PORT = 4000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hi");
});

app.use("/users", userRouter);
app.use(todoListRouter);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
