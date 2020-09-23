import { IUser } from './User';

export interface ISession {
	id:          string;
	createdAt?:  string;
	finishedAt?: undefined | string;
	online:      boolean;
	createdBy:   string;
	party:       Array<IUser>;
	content?:    string;
}

