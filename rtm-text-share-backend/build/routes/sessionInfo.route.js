"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateMasterKey_1 = require("../middlewares/validateMasterKey");
const ws_1 = require("../ws");
const sessionInfoRoute = express_1.Router();
sessionInfoRoute.use(validateMasterKey_1.validateMasterKey);
sessionInfoRoute.get('/get', (req, res) => {
    try {
        const sessions = ws_1.getSessions();
        return res.status(200).json({
            requestedAt: new Date().toLocaleString(),
            log: 'get sessions success',
            success: true,
            totalSessions: sessions.length,
            sessions
        });
    }
    catch (e) {
        return res.status(500).json({
            requestedAt: new Date().toLocaleString(),
            log: 'get sessions error',
            success: false,
            error: e.message
        });
    }
});
sessionInfoRoute.get('/get/:id', (req, res) => {
    try {
        const sessions = ws_1.getSessions();
        for (let session of sessions) {
            if (session.id === req.params.id || session.shortId === req.params.id) {
                return res.status(200).json({
                    requestedAt: new Date().toLocaleString(),
                    log: 'get session success',
                    success: true,
                    session
                });
            }
        }
        return res.status(404).json({
            requestedAt: new Date().toLocaleString(),
            log: `session ${req.params.id} not found`,
            success: false
        });
    }
    catch (e) {
        return res.status(500).json({
            requestedAt: new Date().toLocaleString(),
            log: 'get session error',
            success: false,
            error: e.message
        });
    }
});
exports.default = sessionInfoRoute;
