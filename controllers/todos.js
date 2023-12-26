import Todo from "../models/Todo.js";

export const createTodo = async (req, res) => {

    const newTodo = new Todo(req.body);
    try {
        const savedTodo = await newTodo.save();
        res.status(201).json(savedTodo);
    } catch (err) {
        res.status(500).json({
            ok: false,
            msg: err
        });
    }
};

export const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ ok: false, msg: error });
    }
};

export const updateTodo = async (req, res) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        if (updatedTodo === null) {
            return res.status(404).json({
                ok: false,
                msg: 'Todo not found!'
            });
        }
        res.status(200).json(updatedTodo);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const deleteTodo = async (req, res) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedTodo);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getTodo = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json(error);
    }
};