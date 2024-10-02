const express = require("express");

const { isLoggedIn, isNotLoggedIn } = require("../middlewares");

const {
  getTodos,
  postTodo,
  deleteTodo,
  doneUpdate,
} = require("../controllers/page");

const router = express.Router();

// router.use((req, res, next) => {
//   next();
// });

router.get("/", getTodos);

router.post("/", isLoggedIn, postTodo);

router.delete("/:id", isLoggedIn, deleteTodo);

router.patch("/:id", isLoggedIn, doneUpdate);

module.exports = router;
