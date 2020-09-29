"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ws_1 = require("../ws");
const infoRoute = express_1.Router();
infoRoute.get('/get/users', (req, res) => {
    try {
        const users = ws_1.getUsers();
        return res.status(200).json({
            requestedAt: new Date().toLocaleString(),
            log: 'get users success',
            success: true,
            totalUsers: users.length,
            users
        });
    }
    catch (e) {
        return res.status(404).json({
            requestedAt: new Date().toLocaleString(),
            log: 'get users fail',
            success: false,
            error: e.message
        });
    }
});
exports.default = infoRoute;
