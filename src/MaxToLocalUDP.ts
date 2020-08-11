import moment from 'moment';
// @ts-ignore
import { Client } from 'node-osc';

export class MaxToLocalUDP {
	private readonly MAXMSP_PORT: number = 8002;
	private readonly MAXMSP_HOST: string = '127.0.0.1';
	private oscSocketServer: any;

	constructor() {
		this.initSocket();
	}

	public incomingMessage(message: any): void {
		this.oscSocketServer.send(message, () => {
			console.log(
				`[MAX TO UDP CLIENT]: ${moment().format('MM/DD/YY, h:mm:ss a')} | Send message: ${JSON.stringify(
					message,
					null,
					4,
				)}`,
			);
		});
	}

	private initSocket(): void {
		this.oscSocketServer = new Client(this.MAXMSP_HOST, this.MAXMSP_PORT);
		console.log(`[MAX TO UDP CLIENT]: ${moment().format('MM/DD/YY, h:mm:ss a')} | ------------------`);
		console.log(
			`[MAX TO UDP CLIENT]: ${moment().format('MM/DD/YY, h:mm:ss a')} | Running local MAX TO UDP CLIENT on port ${
				this.MAXMSP_PORT
			}`,
		);
		console.log(`[MAX TO UDP CLIENT]: ${moment().format('MM/DD/YY, h:mm:ss a')} | ------------------`);
	}
}
