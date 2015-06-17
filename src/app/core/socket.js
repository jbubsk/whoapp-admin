import config from './config';
import io from 'socket.io-client';

var socket = io.connect(config.serviceHost);

export default socket;