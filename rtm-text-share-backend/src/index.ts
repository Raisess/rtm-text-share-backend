import express, { Application, Request, Response } from 'express';
import http, { Server, createServer } from 'http';
import cors from 'cors';
import dotenv from 'dotenv';

import { ws } from './ws';
// config
import { PORT } from './config';
// routes
import userInfoRoute from './routes/userInfo.route';
import sessionInfoRoute from './routes/sessionInfo.route';

// server setup
const app: Application = express();
const server: Server = createServer(app);
// ws setup
const io: SocketIO.Server = require('socket.io')(server);

dotenv.config();
app.use(cors());

app.get('/', (req: Request, res: Response) => {
	return res.status(200).json({
		ping:         'pong',
		requested_at: new Date().toLocaleString()
	});
});

app.use('/users', userInfoRoute);
app.use('/sessions', sessionInfoRoute);

// starts ws server
ws(io);

server.listen(PORT, () => console.log('running on port:', PORT));

