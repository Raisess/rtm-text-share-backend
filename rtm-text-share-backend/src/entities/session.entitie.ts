import sha256 from 'sha256';

import { ISession } from '../interfaces/Session';
import { IUser} from '../interfaces/User';

export const createSession = (id: string, sessionId: string, session: ISession): ISession => {
	const { password } = session;

	return {
		id:         sessionId,
		createdAt:  new Date().toLocaleString(),
		finishedAt: undefined,
		online:     true,
		createdBy:  id,
		party:      [],
		content:    '',
		password:   password ? sha256(password + process.env.PASS_ALT) : ''
	};
}

export const enterSession = (sessionId: string, userId: string, password: string | undefined, sessions: Array<ISession>, users: Array<IUser>): Array<number> => {
	for (let i = 0; i < sessions.length; i++) {
		if (sessionId === sessions[i].id) {
			for (let j = 0; j < users.length; j++) {
				if (userId === users[j].id) {
					if (sessions[i].password !== '' && sessions[i].password !== undefined) {
						if (sessions[i].password === (password ? sha256(password + process.env.PASS_ALT) : '')) {
							return [1, i, j];
						} else {
							return [0, -1, -1];
						}
					} else {
						return [1, i, j];
					}
				}
			}
		}
	}

	return [0, -1, -1];
};

// TODO
export const finishSession = (): void => {}

