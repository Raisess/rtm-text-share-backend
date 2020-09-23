import { IUser } from './interfaces/User';
import { ISession } from './interfaces/Session';

import { createUser } from './entities/user.entitie';

// data storage
let users:    Array<IUser>    = [];
let sessions: Array<ISession> = [];

export const ws = (io: SocketIO.Server): void => {
	io.on('connection', (socket: any) => {
		console.log(socket.id, 'has been connected to server');

		// create user event
		socket.on('create_user', (userData: IUser) => {
			try {
				const user: IUser = createUser(socket.id, userData);
				users.push(user);

				return socket.emit('create_user_response', {
					log:     'user been created',
					success: true
				});
			} catch (e) {
				return socket.emit('create_user_response', {
					log:     'user not created',
					success: false,
					error:   e.message
				});
			}
		});

		socket.on('disconnect', () => console.log(socket.id, 'has been disconnected from server'));
	});
}

// get data functions
export const getSessions = (): Array<ISession> => sessions;
export const getUsers    = (): Array<IUser>    => users;

