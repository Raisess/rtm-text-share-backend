import { v4 as uuidv4 } from 'uuid';

import { IUser } from './interfaces/User';
import { ISession, ISessionEnter } from './interfaces/Session';

import shortIdGen from './utils/shortIdGen';

import { createUser, deleteUser } from './entities/user.entitie';
import { createSession, enterSession } from './entities/session.entitie';

// data storage
let users:    Array<IUser>    = [];
let sessions: Array<ISession> = [];

export const ws = (io: SocketIO.Server): void => {
	io.on('connection', (socket: any) => {
		console.log(socket.id, 'has been connected to server');

		// create user event
		socket.on('create_user', (userData: IUser) => {
			const user: IUser = createUser(socket.id, userData);
			users.push(user);

			return socket.emit('create_user_response', {
				log:     'user created',
				userId:  socket.id
			});
		});

		// create session event
		socket.on('create_session', (sessionData: ISession) => {
			const sessionId: string   = uuidv4();
			const shortId:   string   = shortIdGen();

			const session:   ISession = createSession(socket.id, [sessionId, shortId], sessionData);
			
			sessions.push(session);

			return socket.emit('create_session_response', {
				log:        'session created',
				sessionId,
				shortId
			});
		});

		// enter on session event
		socket.on('enter_session', (sessionToEnter: ISessionEnter) => {
			const {
				sessionId,
				password
			} = sessionToEnter;

			const canEnterSession: Array<number> = enterSession(sessionId, socket.id, password, sessions, users);

			if (canEnterSession[0] === 1) {
				sessions[canEnterSession[1]].party.push(users[canEnterSession[2]]);

				users[canEnterSession[2]].onSession            = sessionId;
				users[canEnterSession[2]].lastSessionEnterTime = new Date().toLocaleString();

				socket.join(sessionId);

				return socket.emit('enter_session_response', {
					log:       'enter session success',
					success:   true,
					userId:    socket.id,
					sessionId
				});
			}

			return socket.emit('enter_session_response', {
				log:     'enter session fail',
				success: false
			});
		});

		// quit event
		socket.on('disconnect', () => {
			const canDeleteUser: Array<number> = deleteUser(socket.id, users, sessions);

			if (canDeleteUser[0] === 1) {
				delete users[canDeleteUser[1]];

				if (canDeleteUser[2] !== -1 && canDeleteUser[3] !== -1) {
					delete sessions[canDeleteUser[2]].party[canDeleteUser[3]];
				}
			}

			console.log(socket.id, 'has been disconnected from server');
			return;
		});
	});
}

// get data functions
export const getSessions = (): Array<ISession> => sessions;
export const getUsers    = (): Array<IUser>    => users;

