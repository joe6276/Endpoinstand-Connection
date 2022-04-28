"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../Controller/user.controller");
const Allow_1 = require("../Midlleware/Allow");
const Verify_1 = require("../Midlleware/Verify");
const router = express_1.default.Router();
router.post('/create', user_controller_1.createUser);
router.post('/login', user_controller_1.loginUser);
router.get('/', user_controller_1.getUsers);
router.get('/home', Verify_1.VerifyToken, Allow_1.Allow, user_controller_1.homepage);
router.get('/:id', user_controller_1.getUser);
router.patch('/:id', user_controller_1.updateUser);
router.delete('/:id', Verify_1.VerifyToken, user_controller_1.deleteUser);
exports.default = router;
