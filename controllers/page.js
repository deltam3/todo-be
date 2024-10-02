const Todo = require("../models/todo");
const Category = require("../models/category");
const User = require("../models/user");

exports.getTodos = async (req, res, next) => {
  try {
    const todos = await Todo.findAll({
      include: [
        {
          model: User,
          attributes: ["nick"],
        },
        {
          model: Category,
          attributes: ["name"],
        },
      ],
    });

    const formattedTodos = todos.map((todo) => ({
      id: todo.id,
      content: todo.content,
      done: todo.done,
      userNick: todo.User.nick,
      categoryName: todo.Category.name,
    }));

    res.json({
      todos: formattedTodos,
    });
  } catch (err) {
    return err;
  }
};

exports.postTodo = async (req, res, next) => {
  const { content, category } = req.body;

  try {
    const todo = await Todo.create({
      content: content,
      UserId: req.user.id,
    });

    const [categoryInstance] = await Category.findOrCreate({
      where: { name: category },
    });
    await todo.setCategory(categoryInstance);

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
