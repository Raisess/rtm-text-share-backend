"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.finishSession = exports.updateSession = exports.enterSession = exports.createSession = void 0;
const sha256_1 = __importDefault(require("sha256"));
function createSession(id, ids, session) {
    const { password } = session;
    return {
        id: ids[0],
        shortId: ids[1],
        createdAt: new Date().toLocaleString(),
        finishedAt: undefined,
        online: true,
        createdBy: id,
        party: [],
        content: Buffer.from('', 'utf8'),
        lastUpdateTime: '',
        password: password ? sha256_1.default(password + process.env.PASS_ALT) : ''
    };
}
exports.createSession = createSession;
function enterSession(sessionId, userId, password, sessions, users) {
    for (let i = 0; i < sessions.length; i++) {
        if (sessionId === sessions[i].id || sessionId === sessions[i].shortId) {
            for (let j = 0; j < users.length; j++) {
                if (userId === users[j].id) {
                    if (sessions[i].password && sessions[i].password !== '') {
                        if (sessions[i].password === (password ? sha256_1.default(password + process.env.PASS_ALT) : '')) {
                            return [1, i, j];
                        }
                        else {
                            return [0, -1, -1];
                        }
                    }
                    else {
                        return [1, i, j];
                    }
                }
            }
        }
    }
    return [0, -1, -1];
}
exports.enterSession = enterSession;
;
function updateSession(idOrShortId, sessions) {
    for (let i = 0; i < sessions.length; i++) {
        if (idOrShortId === sessions[i].id || idOrShortId === sessions[i].shortId) {
            return [1, i];
        }
    }
    return [0, -1];
}
exports.updateSession = updateSession;
function finishSession() { }
exports.finishSession = finishSession;
