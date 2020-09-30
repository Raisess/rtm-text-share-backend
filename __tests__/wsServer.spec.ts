import io from 'socket.io-client';

function getApiUri(localhost: boolean): string {
	if (localhost) return 'http://localhost:1939/';
	
	return 'https://api-rtm-text-share.herokuapp.com/';
}

interface ISession {
	sessionId: string;
	password?: string;
	content?:  string;
}

const socket: SocketIOClient.Socket = io(getApiUri(false));

describe('test web socket server', () => {
	describe('user block', () => {
		test('create user', () => {
			socket.emit('create_user', {
				username: 'test'
			});

			socket.on('create_user_response', (response: any) => expect(response.log).toBe('user created'));
		});
	});

	describe('session block', () => {
		let session: ISession = {
			sessionId: '',
			password:  '123',
			content:   'oi'
		};

		test('create session', (done: any) => {
			socket.emit('create_session', {
				password: session.password
			});

			socket.on('create_session_response', (response: any) => {
				try {
					session.sessionId = response.sessionId;

					expect(response.log).toBe('session created');
					done();
				} catch (e) {
					done(e);
				}
			});
		});

		test('enter session', () => {
			socket.emit('enter_session', {
				sessionId: session.sessionId,
				password:  session.password
			});

			console.log(session);

			socket.on('enter_session_response', (response: any) => expect(response.log).toBe('enter session success'));
		});

		test('update session', () => {
			socket.emit('update_session', {
				sessionId: session.sessionId,
				content:   session.content
			});

			socket.on('update_session_response', (response: any) => expect(response.log).toBe('update session success'));
		});
	});
});

