import { IUser } from './User';

export interface ISession {
	id:              string;
	createdAt?:      string;
	finishedAt?:     string;
	online:          boolean;
	createdBy:       string;
	party:           Array<IUser>;
	content?:        string;
	password?:       string;
	lastUpdateTime?: string;
}

export interface ISessionEnter {
	sessionId: string;
	password?: string;
}

