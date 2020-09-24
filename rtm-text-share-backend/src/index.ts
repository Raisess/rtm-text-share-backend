import express, { Application, Request, Response } from 'express';
import http, { Server, createServer } from 'http';
import cors from 'cors';

import { ws } from './ws';
// config
import { PORT } from './config';
// routes
import userInfoRoute from './routes/userInfo.route';

// server setup
const app: Application = express();
const server: Server = createServer(app);
// ws setup
const io: SocketIO.Server = require('socket.io')(server);

app.use(cors());

app.get('/', (req: Request, res: Response) => {
	return res.status(200).json({
		ping:         'pong',
		requested_at: new Date().toLocaleString()
	});
});

app.use('/info', userInfoRoute);

// starts ws server
ws(io);

server.listen(PORT, () => console.log('running on port:', PORT));

