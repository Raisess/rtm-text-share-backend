import { Router, Request, Response } from 'express';

import { IUser } from '../interfaces/User';
import { getUsers } from '../ws';

const userInfoRoute: Router = Router();

userInfoRoute.get('/get/users', (req: Request, res: Response) => {
	try {
		const users: Array<IUser> = getUsers();

		return res.status(200).json({
			requestedAt: new Date().toLocaleString(),
			log:         'get users success',
			success:     true,
			totalUsers:  users.length,
			users
		});
	} catch (e) {
		return res.status(500).json({
			requestedAt: new Date().toLocaleString(),
			log:         'get users error',
			success:     false,
			error:       e.message
		});
	}
});

userInfoRoute.get('/get/users/:usernameOrId', (req: Request, res: Response) => {
	try {
		const users: Array<IUser> = getUsers();

		for (let user of users) {
			if (user.username === req.params.usernameOrId || user.id === req.params.usernameOrId) {
				return res.status(200).json({
					requestedAt: new Date().toLocaleString(),
					log:         'get user success',
					success:     true,
					user
				});
			}
		}

		return res.status(404).json({
			requestedAt: new Date().toLocaleString(),
			log:         `user ${req.params.username} not found`,
			success:     false
		});
	} catch (e) {
		return res.status(500).json({
			requestedAt: new Date().toLocaleString(),
			log:         'get user error',
			success:     false,
			error:       e.message
		});
	}
});

export default userInfoRoute; 

