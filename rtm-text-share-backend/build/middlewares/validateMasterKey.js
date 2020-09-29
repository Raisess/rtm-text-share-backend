"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateMasterKey = void 0;
function validateMasterKey(req, res, next) {
    const key = req.query.key;
    if (key === process.env.MASTER_KEY) {
        return next();
    }
    return res.status(401).json({
        log: 'invalid key',
        success: false
    });
}
exports.validateMasterKey = validateMasterKey;
