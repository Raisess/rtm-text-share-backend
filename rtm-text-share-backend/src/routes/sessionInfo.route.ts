import { Router, Request, Response } from 'express';

import { validateMasterKey } from '../middlewares/validateMasterKey';

import { ISession } from '../interfaces/Session';
import { getSessions } from '../ws';

const sessionInfoRoute: Router = Router();

sessionInfoRoute.use(validateMasterKey);

sessionInfoRoute.get('/get', (req: Request, res: Response) => {
	try {
		const sessions: Array<ISession> = getSessions();

		return res.status(200).json({
			requestedAt: new Date().toLocaleString(),
			log:         'get sessions success',
			success:     true,
			totalSessions:  sessions.length,
			sessions
		});
	} catch (e) {
		return res.status(500).json({
			requestedAt: new Date().toLocaleString(),
			log:         'get sessions error',
			success:     false,
			error:       e.message
		});
	}
});

sessionInfoRoute.get('/get/:id', (req: Request, res: Response) => {
	try {
		const sessions: Array<ISession> = getSessions();

		for (let session of sessions) {
			if (session.id === req.params.id) {
				return res.status(200).json({
					requestedAt: new Date().toLocaleString(),
					log:         'get session success',
					success:     true,
					session
				});
			}
		}

		return res.status(404).json({
			requestedAt: new Date().toLocaleString(),
			log:         `session ${req.params.id} not found`,
			success:     false
		});
	} catch (e) {
		return res.status(500).json({
			requestedAt: new Date().toLocaleString(),
			log:         'get session error',
			success:     false,
			error:       e.message
		});
	}
});

export default sessionInfoRoute; 

