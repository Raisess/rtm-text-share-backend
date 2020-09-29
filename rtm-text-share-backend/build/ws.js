"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.getSessions = exports.ws = void 0;
const uuid_1 = require("uuid");
const user_entitie_1 = require("./entities/user.entitie");
const session_entitie_1 = require("./entities/session.entitie");
const shortIdGen_1 = __importDefault(require("./utils/shortIdGen"));
const debugLog_1 = __importDefault(require("./utils/debugLog"));
let users = [];
let sessions = [];
function ws(io) {
    io.on('connection', (socket) => {
        debugLog_1.default(socket.id, 'has been connected to server');
        socket.on('create_user', (userData) => {
            const user = user_entitie_1.createUser(socket.id, userData);
            users.push(user);
            debugLog_1.default('new user!');
            debugLog_1.default(users);
            return socket.emit('create_user_response', {
                log: 'user created',
                userId: socket.id
            });
        });
        socket.on('create_session', (sessionData) => {
            const sessionId = uuid_1.v4();
            const shortId = shortIdGen_1.default();
            const session = session_entitie_1.createSession(socket.id, [sessionId, shortId], sessionData);
            sessions.push(session);
            debugLog_1.default('new session!');
            debugLog_1.default(sessions);
            return socket.emit('create_session_response', {
                log: 'session created',
                sessionId,
                shortId
            });
        });
        socket.on('enter_session', (sessionToEnter) => {
            const { sessionId, password } = sessionToEnter;
            const canEnterSession = session_entitie_1.enterSession(sessionId, socket.id, password, sessions, users);
            if (canEnterSession[0] === 1) {
                sessions[canEnterSession[1]].party.push(users[canEnterSession[2]]);
                users[canEnterSession[2]].onSession = sessionId;
                users[canEnterSession[2]].lastSessionEnterTime = new Date().toLocaleString();
                socket.join(sessionId);
                return socket.emit('enter_session_response', {
                    log: 'enter session success',
                    success: true,
                    userId: socket.id,
                    sessionId
                });
            }
            return socket.emit('enter_session_response', {
                log: 'enter session fail',
                success: false
            });
        });
        socket.on('update_session', (session) => {
            const { sessionId, content } = session;
            const newContent = content ? content : '';
            const toUpdate = session_entitie_1.updateSession(sessionId, sessions);
            if (toUpdate[0] === 1) {
                const id = sessions[toUpdate[1]].id;
                sessions[toUpdate[1]].content = Buffer.from(newContent, 'utf8');
                sessions[toUpdate[1]].lastUpdateTime = new Date().toLocaleString();
                const newBuf = sessions[toUpdate[1]].content;
                debugLog_1.default('updated session!');
                debugLog_1.default('buffer:', newBuf);
                debugLog_1.default('string:', (newBuf ? newBuf.toString() : ''));
                return socket.broadcast.to(id).emit('update_session_response', {
                    log: 'update session success',
                    success: true,
                    content: newBuf
                });
            }
            return socket.emit('update_session_response', {
                log: 'update session fail',
                success: false
            });
        });
        socket.on('disconnect', () => {
            const canDeleteUser = user_entitie_1.deleteUser(socket.id, users, sessions);
            if (canDeleteUser[0] === 1) {
                delete users[canDeleteUser[1]];
                if (canDeleteUser[2] !== -1 && canDeleteUser[3] !== -1) {
                    delete sessions[canDeleteUser[2]].party[canDeleteUser[3]];
                }
            }
            debugLog_1.default(socket.id, 'has been disconnected from server');
            return;
        });
    });
}
exports.ws = ws;
function getSessions() { return sessions; }
exports.getSessions = getSessions;
function getUsers() { return users; }
exports.getUsers = getUsers;
