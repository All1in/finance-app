import socketIOClient from 'socket.io-client';

const socket = socketIOClient('http://localhost:4000'); // Replace the URL with your server's address

export default socket;
