import { ChatServer } from './app';
import * as express from 'express';
import * as path from 'path';

let app = new ChatServer().getApp();

app.use('/dist', express.static('dist'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.get('/room', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.get('/room/:roomId', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});
export { app };
