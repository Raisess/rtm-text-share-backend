"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateMasterKey_1 = require("../middlewares/validateMasterKey");
const ws_1 = require("../ws");
const userInfoRoute = express_1.Router();
userInfoRoute.use(validateMasterKey_1.validateMasterKey);
userInfoRoute.get('/get', (req, res) => {
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
        return res.status(500).json({
            requestedAt: new Date().toLocaleString(),
            log: 'get users error',
            success: false,
            error: e.message
        });
    }
});
userInfoRoute.get('/get/:usernameOrId', (req, res) => {
    try {
        const users = ws_1.getUsers();
        for (let user of users) {
            if (user.username === req.params.usernameOrId || user.id === req.params.usernameOrId) {
                return res.status(200).json({
                    requestedAt: new Date().toLocaleString(),
                    log: 'get user success',
                    success: true,
                    user
                });
            }
        }
        return res.status(404).json({
            requestedAt: new Date().toLocaleString(),
            log: `user ${req.params.usernameOrId} not found`,
            success: false
        });
    }
    catch (e) {
        return res.status(500).json({
            requestedAt: new Date().toLocaleString(),
            log: 'get user error',
            success: false,
            error: e.message
        });
    }
});
exports.default = userInfoRoute;
