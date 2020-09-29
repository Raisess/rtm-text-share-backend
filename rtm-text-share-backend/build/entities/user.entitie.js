"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.createUser = void 0;
function createUser(id, user) {
    const { username, onSession } = user;
    return {
        id,
        username,
        onSession,
        createdAt: new Date().toLocaleString(),
        lastSessionEnterTime: ''
    };
}
exports.createUser = createUser;
function deleteUser(id, users, sessions) {
    let response = [1, -1, -1, -1];
    for (let i = 0; i < users.length; i++) {
        if (users[i]) {
            if (id === users[i].id)
                response[1] = i;
            if (users[i].onSession && users[i].onSession !== '') {
                for (let j = 0; j < sessions.length; j++) {
                    for (let y = 0; y < sessions[j].party.length; y++) {
                        if (sessions[j].party[y] && id === sessions[j].party[y].id) {
                            response[2] = j;
                            response[3] = y;
                        }
                    }
                }
            }
            return response;
        }
    }
    return [0, -1, -1, -1];
}
exports.deleteUser = deleteUser;
