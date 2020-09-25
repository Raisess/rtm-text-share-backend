import { ISession } from '../interfaces/Session';

export const createSession = (id: string, sessionId: string): ISession => {
	return {
		id:         sessionId,
		createdAt:  new Date().toLocaleString(),
		finishedAt: undefined,
		online:     true,
		createdBy:  id,
		party:      [],
		content:    ''
	};
}

// TODO
export const enterSession = (sessionId: string, userId: string): boolean => true;

// TODO
export const finishSession = (): void => {}

