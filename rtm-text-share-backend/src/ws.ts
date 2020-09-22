const ws = (io: SocketIO.Server): void => {
	io.on('connection', (socket: any) => {
		console.log(socket.id, 'has been connected from server');

		socket.on('disconnect', () => console.log(socket.id, 'has been disconnected from server'));
	});
}

export default ws;

