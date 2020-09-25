import sha256 from 'sha256';
import { ISession } from '../interfaces/Session';

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

// TODO
export const enterSession = (sessionId: string, userId: string): boolean => true;

// TODO
export const finishSession = (): void => {}

