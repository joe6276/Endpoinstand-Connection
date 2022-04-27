"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todo_routes_1 = __importDefault(require("./Routes/todo.routes"));
const config_1 = __importDefault(require("./config/config"));
const mssql_1 = __importDefault(require("mssql"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/todo', todo_routes_1.default);
app.listen(7000, () => {
    console.log('App running on part 7000 ...');
});
//  connection here
// const checkConnection=async ()=>{
// await mssql.connect(sqlConfig).then(
//     x=>{
//        if( x.connected){
//            console.log('Database Connected');
//        }
//     }
// ).catch(err=>{
//     console.log(err.message);
// })
// }
const checkConnection = async () => {
    try {
        const x = await mssql_1.default.connect(config_1.default);
        if (x.connected) {
            console.log('Database Connected');
        }
    }
    catch (error) {
        console.log(error.message);
    }
};
checkConnection();
// localhost:7000/todo/create-POST
// localhost:7000/todo/getAll- GET
// localhost:7000/todo/getOne/:id- GET
// localhost:7000/todo/:id -DELETE
// localhost:7000/todo/update/:id -UPDATE 
//  controller - consist of method that are exported  
// ..This methods handle the application login
// getUsers- getUser(){
//  Run a query - SELECT * FROM USERTABLE
// returns:
// [
//     {
//         "id": "1",
//         "username": "Jonathan",
//         "email": "joendambuki16@gmail.com",
//         "password": "1234567890"
//     },
//     {
//         "id": "3",
//         "username": "Jonathan",
//         "email": "joendambuki17@gmail.com",
//         "password": "1234567890"
//     }
// ]
// Todolist:todoId, TotoTitle, Tododescription
// }
// Routes
// Has Routes GET POST PUT/PATCH DELETE
// GET-getUser()
// DELETE- deleteUser(id);
