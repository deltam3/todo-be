const { Todo } = require("../models");

exports.getTodos = async (req, res, next) => {
  try {
    const todos = await Todo.findAll();
    res.json({
      todos: todos,
    });
  } catch (err) {
    next(err);
  }
};

exports.postTodo = async (req, res, next) => {
  try {
    const todo = await Todo.create({
      content: req.body.content,
    });
    res.status(201).json({
      message: "Todo created successfully",
      todo,
    });
  } catch (err) {
    console.error("Error creating todo:", err);
    res.status(500).json({
      message: "Failed to create todo",
      error: err.message,
    });
  }
};

exports.deleteTodo = async (req, res, next) => {
  try {
    const result = await Todo.destroy({
      where: { id: req.params.id },
    });

    if (result) {
      res.status(200).json({
        message: "Todo deleted successfully",
      });
    } else {
      res.status(404).json({
        message: "Todo not found",
      });
    }
  } catch (err) {
    console.error("Error deleting todo:", err);
    res.status(500).json({
      message: "Failed to delete todo",
      error: err.message,
    });
  }
};

exports.doneUpdate = async (req, res, next) => {
  let doneStatus = req.body.done;

  try {
    const result = await Todo.update(
      {
        done: doneStatus,
      },
      {
        where: { id: req.params.id },
      }
    );

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
