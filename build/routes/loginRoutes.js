"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const middleware_1 = require("../auth/middleware");
const router = (0, express_1.Router)();
exports.router = router;
router.get('/login', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../../views/form.html'));
});
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (email && password && email == 'rose@mail.com' && password == 'waffles') {
        // mark this person as logged in
        req.session = {
            loggedIn: true,
        };
        //redirect them to root route
        res.redirect('/');
    }
    else {
        res.send('Invalid Email or Password');
    }
});
router.get('/', (req, res) => {
    if (req.session && req.session.loggedIn) {
        res.sendFile(path_1.default.join(__dirname, '../../views/loggedIn.html'));
    }
    else {
        res.sendFile(path_1.default.join(__dirname, '../../views/loggedOut.html'));
    }
});
router.get('/logout', (req, res) => {
    req.session = undefined;
    res.redirect('/');
});
router.get('/protected', middleware_1.requireAuth, (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../../views/protected.html'));
});
