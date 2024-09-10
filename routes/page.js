const express = require("express");
const {
  getTodos,
  postTodo,
  deleteTodo,
  doneUpdate,
} = require("../controllers/page");

const router = express.Router();

router.get("/", getTodos);

router.post("/", postTodo);

router.delete("/:id", deleteTodo);

router.patch("/:id", doneUpdate);

module.exports = router;
