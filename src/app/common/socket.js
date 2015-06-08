import config from '../common/config';

var socket = io.connect(config.socketHost);

export default socket;