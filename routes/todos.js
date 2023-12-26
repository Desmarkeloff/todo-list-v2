import express from "express";
import { createTodo, deleteTodo, getTodo, getTodos, updateTodo } from "../controllers/todos.js";

const router = express.Router();

//CREATE
router.post('/', createTodo);
//READ
router.get('/', getTodos);
//UPDATE
router.put('/:id', updateTodo);
//DELETE
router.delete('/:id', deleteTodo);

router.get('/:id', getTodo);
export default router;