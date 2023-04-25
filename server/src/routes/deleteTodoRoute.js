const TodoModel = require('../models/TodoModel');

module.exports = async (req, res) => {

    console.log(req.params)
    const {id} = req.params;
    const todo = await TodoModel.findById(id);
    await todo.deleteOne();
    res.status(204).json(todo)
}