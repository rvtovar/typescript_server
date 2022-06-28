"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const router = (0, express_1.Router)();
exports.router = router;
router.get('/login', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../../views/form.html'));
});
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    res.send(email.toUpperCase());
});
