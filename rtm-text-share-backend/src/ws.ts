import { IUser } from './interfaces/User';
import { ISession } from './interfaces/Session';

import { createUser } from './entities/user.entitie';

let users:    Array<IUser>    = [];
let sessions: Array<ISession> = [];

export const ws = (io: SocketIO.Server): void => {
	io.on('connection', (socket: any) => {
		console.log(socket.id, 'has been connected to server');

		socket.on('create_user', (userData: IUser) => {
			users.push(createUser(socket.id, userData));
		});

		socket.on('disconnect', () => console.log(socket.id, 'has been disconnected from server'));
	});
}

export const getSessions = (): Array<ISession> => sessions;
export const getUsers    = (): Array<IUser>    => users;

