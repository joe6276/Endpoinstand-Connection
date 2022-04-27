"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.getTodo = exports.getTodos = exports.createTodo = void 0;
const Todo_1 = __importDefault(require("../Model/Todo"));
const uuid_1 = require("uuid");
// interface TodoInterface{
//     todoId:string
//     TotoTitle:string;
//     Tododescription:string
// }
// interface is a typescript type this means that when we compile to JS
// i wont compile to Js But classes will because they are Part of ES6
const Todos = [];
const createTodo = (req, res, next) => {
    const todoid = (0, uuid_1.v1)();
    const { todotitle, tododescription } = req.body;
    const newTodo = new Todo_1.default(todoid, todotitle, tododescription);
    Todos.push(newTodo);
    res.status(200).json({
        "message": 'User successfully added',
        newTodo
    });
};
exports.createTodo = createTodo;
const getTodos = (req, res, next) => {
    res.json(Todos);
};
exports.getTodos = getTodos;
const getTodo = (req, res) => {
    const id = req.params.id;
    console.log(typeof id);
    const todo = Todos.filter(X => X.todoid === id);
    if (!todo[0]) {
        res.json({ message: `Todo with id :${id} Is Not Found` });
    }
    else {
        res.json(todo);
    }
};
exports.getTodo = getTodo;
const updateTodo = (req, res) => {
    const id = req.params.id;
    const { todotitle, tododescription } = req.body;
    const todo = Todos.filter(X => X.todoid === id);
    if (!todo[0]) {
        res.json({ message: `Todo with id :${id} Is Not Found` });
    }
    else {
        todo[0].todotitle = todotitle;
        todo[0].tododescription = tododescription;
        res.json(todo);
    }
};
exports.updateTodo = updateTodo;
const deleteTodo = (req, res) => {
    const id = req.params.id;
    const index = Todos.findIndex(x => x.todoid === id);
    console.log(typeof index, index);
    if (index < 0) {
        res.json({ message: `Todo with id :${id} Is Not Found` });
    }
    else {
        Todos.splice(index, 1);
        res.json({ message: `Todo with id :${id} is Deleted` });
    }
};
exports.deleteTodo = deleteTodo;
