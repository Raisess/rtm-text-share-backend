"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function log(...toLog) {
    return process.env.DEBUG === 'true' ? console.log(...toLog) : null;
}
exports.default = log;
