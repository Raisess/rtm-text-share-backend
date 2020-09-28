import { v4 as uuidv4 } from 'uuid';

import { IUser } from './interfaces/User';
import { ISession, ISessionEnter, ISessionUpdate } from './interfaces/Session';

import { createUser, deleteUser } from './entities/user.entitie';
import { createSession, enterSession, updateSession } from './entities/session.entitie';

import shortIdGen from './utils/shortIdGen';
import log from './utils/debugLog';

// data storage
let users:    Array<IUser>    = [];
let sessions: Array<ISession> = [];

export const ws = (io: SocketIO.Server): void => {
	io.on('connection', (socket: any) => {
		log(socket.id, 'has been connected to server');

		// create user event
		socket.on('create_user', (userData: IUser) => {
			const user: IUser = createUser(socket.id, userData);
			users.push(user);

			log('new user!');
			log(users);

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

			log('new session!');
			log(sessions);

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

		// update session event
		socket.on('update_session', (session: ISessionUpdate) => {
			const {
				sessionId,
				content
			} = session;

			const newContent: string = content ? content : '';

			const toUpdate: Array<number> = updateSession(sessionId, sessions);

			if (toUpdate[0] === 1) {
				// get the default session id
				const id: string = sessions[toUpdate[1]].id;

				sessions[toUpdate[1]].content        = Buffer.from(newContent, 'utf8');
				sessions[toUpdate[1]].lastUpdateTime = new Date().toLocaleString();

				const newBuf: Buffer | undefined = sessions[toUpdate[1]].content;

				log('updated session!');
				log('buffer:', newBuf);
				log('string:', (newBuf ? newBuf.toString() : ''));

				return socket.broadcast.to(id).emit('update_session_response', {
					log:     'update session success',
					success: true,
					content: newBuf
				});
			}

			return socket.emit('update_session_response', {
				log:     'update session fail',
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

			log(socket.id, 'has been disconnected from server');
			return;
		});
	});
}

// get data functions
export const getSessions = (): Array<ISession> => sessions;
export const getUsers    = (): Array<IUser>    => users;

