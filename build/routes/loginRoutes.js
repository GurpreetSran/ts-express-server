"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var requireAuth = function (req, res, next) {
    if (req.session && req.session.loggedIn) {
        next();
        return;
    }
    res.status(403);
    res.send('Not pemitted');
};
var router = express_1.Router();
exports.router = router;
router.get('/', function (req, res) {
    if (req.session && req.session.loggedIn) {
        res.send("\n      Logged in \n      <a href=\"/logout\"> Log Out </a>\n    ");
    }
    else {
        res.send("\n      Not logged in \n      <a href=\"/login\"> Login </a>\n    ");
    }
});
router.get('/logout', function (req, res) {
    if (req.session) {
        req.session.loggedIn = false;
        res.redirect('/');
    }
});
router.get('/protected', requireAuth, function (req, res) {
    res.send('Welcome to classified area! ');
});
