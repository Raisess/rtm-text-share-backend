import { IUser } from '../interfaces/User';

export const createUser = (id: string, user: IUser): IUser => {
	const {
		username,
		onSession
	} = user;

	return {
		id,
		username,
		onSession,
		createdAt: new Date().toLocaleString()
	};
}

