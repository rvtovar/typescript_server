"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var path_1 = __importDefault(require("path"));
var middleware_1 = require("../auth/middleware");
var router = (0, express_1.Router)();
exports.router = router;
router.get('/login', function (req, res) {
    res.sendFile(path_1.default.join(__dirname, '../../views/form.html'));
});
router.get('/', function (req, res) {
    if (req.session && req.session.loggedIn) {
        res.sendFile(path_1.default.join(__dirname, '../../views/loggedIn.html'));
    }
    else {
        res.sendFile(path_1.default.join(__dirname, '../../views/loggedOut.html'));
    }
});
router.get('/logout', function (req, res) {
    req.session = undefined;
    res.redirect('/');
});
router.get('/protected', middleware_1.requireAuth, function (req, res) {
    res.sendFile(path_1.default.join(__dirname, '../../views/protected.html'));
});
