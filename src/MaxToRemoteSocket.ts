import moment from 'moment';
import io from 'socket.io-client';
import { MaxToLocalUDP } from './MaxToLocalUDP';

export class MaxToRemoteSocket {
	private readonly ESBACKEND_PORT: string = process.env.ESBACKEND_PORT;
	private readonly ESBACKEND_IP: string = process.env.ESBACKEND_IP;

	private maxToLocalUDP: MaxToLocalUDP;

	constructor(maxToLocalUDP: MaxToLocalUDP) {
		this.maxToLocalUDP = maxToLocalUDP;

		this.handleSocketTransport();
	}

	private handleSocketTransport(): void {
		const socket = io(`ws://${this.ESBACKEND_IP}:${this.ESBACKEND_PORT}`);
		socket.on('connect', () => {
			console.log(
				`[REMOTE MAX CLIENT]: ${moment().format(
					'MM/DD/YY, h:mm:ss a',
				)} | MAX TO UDP CLIENT Attempting to connect to server over port ${this.ESBACKEND_PORT}`,
			);
			socket.on('connectedToServer', (message: any) => {
				console.log(message);
				console.log(
					`[REMOTE MAX CLIENT]: ${moment().format('MM/DD/YY, h:mm:ss a')} | Socket connected with id: ${socket.id}`,
				);
			});

			socket.on('message', (message: any) => {
				this.maxToLocalUDP.incomingMessage(message);
			});
			this.disconnect(socket);
		});
	}

	private disconnect(socket: SocketIOClient.Socket): void {
		socket.on('disconnect', () => {
			console.log(
				`[REMOTE MAX CLIENT]: ${moment().format('MM/DD/YY, h:mm:ss a')} | Disconnecting from server port ${
					this.ESBACKEND_PORT
				}`,
			);
			socket.disconnect();
			console.log(`[REMOTE MAX CLIENT]: ${moment().format('MM/DD/YY, h:mm:ss a')} | Disconnected`);
			this.handleSocketTransport();
		});
	}
}
