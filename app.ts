import dotenv from 'dotenv';

import Server from './models/server';
dotenv.config();

require('./models/associations');

const server = new Server();
server.listen();
