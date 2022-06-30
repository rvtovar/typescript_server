"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = exports.controller = void 0;
require("reflect-metadata");
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.router = router;
function controller(routePrefix) {
    return function (target) {
        for (let key in target.prototype) {
            const routeHandler = target.prototype[key];
            const path = Reflect.getMetadata('path', target.prototype, key);
            console.log(path);
            if (path) {
                router.get(`${routePrefix}${path}`, routeHandler);
            }
        }
    };
}
exports.controller = controller;
