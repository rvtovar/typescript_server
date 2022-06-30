"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
require("reflect-metadata");
var AppRouter_1 = require("../../AppRouter");
var MetadataKeys_1 = require("./MetadataKeys");
function bodyValidators(props) {
    return function (req, res, next) {
        if (!req.body) {
            res.status(422).send('Invalid Request');
            return;
        }
        for (var _i = 0, props_1 = props; _i < props_1.length; _i++) {
            var prop = props_1[_i];
            if (!req.body[prop]) {
                console.log('Help');
                res.status(422).send('Missing Email or Password Property');
                return;
            }
            next();
        }
    };
}
function controller(routePrefix) {
    return function (target) {
        var router = AppRouter_1.AppRouter.router;
        for (var key in target.prototype) {
            var routeHandler = target.prototype[key];
            var path = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.path, target.prototype, key);
            var method = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.method, target.prototype, key);
            var middlewares = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.middleware, target.prototype, key) ||
                [];
            var requiredBodyProps = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.validator, target.prototype, key) ||
                [];
            var validator = bodyValidators(requiredBodyProps);
            if (path && method == 'get') {
                router[method].apply(router, __spreadArray(__spreadArray(["".concat(routePrefix).concat(path)], middlewares, false), [routeHandler], false));
            }
            else {
                router[method].apply(router, __spreadArray(__spreadArray(["".concat(routePrefix).concat(path), validator], middlewares, false), [routeHandler], false));
            }
        }
    };
}
exports.controller = controller;
