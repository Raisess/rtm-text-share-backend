import { ISession } from '../interfaces/Session';

export const createSession = (id: string, sessionId: '', session: ISession): ISession => {
	const { createdBy } = session;

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
export const finishSession = (): void => {}

