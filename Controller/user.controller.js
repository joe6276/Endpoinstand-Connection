"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.deleteUser = exports.updateUser = exports.getUser = exports.getUsers = exports.createUser = void 0;
const uuid_1 = require("uuid");
const mssql_1 = __importDefault(require("mssql"));
const config_1 = __importDefault(require("../config/config"));
const createUser = async (req, res) => {
    try {
        const id = (0, uuid_1.v1)();
        const { fullname, email, password } = req.body;
        let pool = await mssql_1.default.connect(config_1.default);
        // await pool.request().query(
        //     `INSERT INTO  Users(id,fullname,email,password)
        //     VALUES('${id}', '${fullname}', '${email}', '${password}')
        //     `
        // )
        await pool.request()
            .input('id', mssql_1.default.VarChar, id)
            .input('fullname', mssql_1.default.VarChar, fullname)
            .input('email', mssql_1.default.VarChar, email)
            .input('password', mssql_1.default.VarChar, password)
            .execute('insertUser');
        res.status(200).json({ message: 'USer Created Successfully' });
    }
    catch (error) {
        res.json({ error: error.message });
    }
};
exports.createUser = createUser;
const getUsers = async (req, res, next) => {
    try {
        let pool = await mssql_1.default.connect(config_1.default);
        const users = await pool.request().execute('getUsers');
        res.json(users.recordset);
    }
    catch (error) {
        res.json({ error: error.message });
    }
};
exports.getUsers = getUsers;
const getUser = async (req, res) => {
    try {
        const id = req.params.id;
        let pool = await mssql_1.default.connect(config_1.default);
        const user = await pool.request()
            .input('id', mssql_1.default.VarChar, id)
            .execute('getUser');
        if (!user.recordset[0]) {
            return res.json({ message: `User with id : ${id} Does Not exist` });
        }
        res.json(user.recordset);
    }
    catch (error) {
        res.json({ error: error.message });
    }
};
exports.getUser = getUser;
const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        let pool = await mssql_1.default.connect(config_1.default);
        const { fullname, email } = req.body;
        const user = await pool.request()
            .input('id', mssql_1.default.VarChar, id)
            .execute('getUser');
        if (!user.recordset[0]) {
            return res.json({ message: `User with id : ${id} Does Not exist` });
        }
        await pool.request()
            .input('id', mssql_1.default.VarChar, id)
            .input('fullname', mssql_1.default.VarChar, fullname)
            .input('email', mssql_1.default.VarChar, email)
            .execute('updateUser');
        res.json({ message: "User Successfully Updated" });
    }
    catch (error) {
        res.json({ error: error.message });
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        let pool = await mssql_1.default.connect(config_1.default);
        const user = await pool.request()
            .input('id', mssql_1.default.VarChar, id)
            .execute('getUser');
        if (!user.recordset[0]) {
            return res.json({ message: `User with id : ${id} Does Not exist` });
        }
        await pool.request()
            .input('id', mssql_1.default.VarChar, id)
            .execute('deleteUser');
        res.json({ message: 'User Deleted Successfully' });
    }
    catch (error) {
        res.json({ error: error.message });
    }
};
exports.deleteUser = deleteUser;
const loginUser = async (req, res) => {
    try {
        let pool = await mssql_1.default.connect(config_1.default);
        const { email, password } = req.body;
        const user = await pool.request().query(` SELECT fullname,email,password FROM Users
            WHERE email='${email}'
            `);
        if (!user.recordset[0]) {
            return res.json({ message: `Invalid Credentials` });
        }
        if (user.recordset[0].password !== password) {
            return res.json({ message: `Invalid Credentials` });
        }
        const data = user.recordset.map(record => {
            const { password, ...rest } = record;
            return rest;
        });
        res.json({ message: "Login Success",
            data });
    }
    catch (error) {
        res.json(error.message);
    }
};
exports.loginUser = loginUser;
