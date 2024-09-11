const express = require("express");

const { isLoggedIn, isNotLoggedIn } = require("../middlewares");

const {
  getTodos,
  postTodo,
  deleteTodo,
  doneUpdate,
} = require("../controllers/page");

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

router.get("/", getTodos);

router.post("/", isLoggedIn, postTodo);

router.delete("/:id", isLoggedIn, deleteTodo); // admin만

router.patch("/:id", isLoggedIn, doneUpdate); // admin만

module.exports = router;
