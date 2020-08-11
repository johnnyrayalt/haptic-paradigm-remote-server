import { MaxToLocalUDP } from './MaxToLocalUDP';
import { MaxToRemoteSocket } from './MaxToRemoteSocket';

const maxToLocalUDP = new MaxToLocalUDP();
const maxToRemoteSocket = new MaxToRemoteSocket(maxToLocalUDP);

export { maxToRemoteSocket };
