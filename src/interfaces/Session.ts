import { IUser } from './User';

export interface ISession {
	id:              string;
	shortId:         string;
	createdAt?:      string;
	finishedAt?:     string;
	online:          boolean;
	createdBy:       string;
	party:           Array<IUser>;
	content?:        Buffer;
	password?:       string;
	lastUpdateTime?: string;
}

export interface ISessionEnter {
	sessionId: string;
	password?: string;
}

export interface ISessionUpdate {
	sessionId: string;
	content?:  string;
}

