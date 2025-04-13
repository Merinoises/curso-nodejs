import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';

import { Todo } from '../models/todo';

let todos: Todo[] = [];

const router = Router();

type RequestBody = { text: string };
type RequestParams = { todoId: string };

router.get('/', (req, res, next) => {
    res.status(200).json({ todos: todos });
});

router.post('/todo', (req, res, next) => {
    const body = req.body as RequestBody;
    const newTodo: Todo = {
        id: uuidv4(),
        text: body.text
    };

    todos.push(newTodo);

    res.status(201).json({ message: 'Added todo', todo: newTodo, todos: todos });
});

router.put('/todo/:todoId', (req, res, next) => {
    const params = req.params as RequestParams;
    const tid = params.todoId;
    const body = req.body as RequestBody;
    const todoIndex = todos.findIndex(todoItem => todoItem.id === tid);
    if (todoIndex >= 0) {
        todos[todoIndex] = { id: todos[todoIndex].id, text: body.text };
        res.status(200).json({ message: 'Updated todo', todos: todos });
        return;
    }
    res.status(404).json({ message: 'No se pudo encontrar un todo para esta id.' });
});

router.delete('/todo/:todoId', (req, res, next) => {
    const params = req.params as RequestParams;
    const tid = params.todoId;
    todos = todos.filter(todoItem => todoItem.id !== tid);
    res.status(200).json({ message: 'Deleted todo', todos: todos });
});

export default router;