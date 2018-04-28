import { ChatServer } from './app';
import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';

let app = new ChatServer().getApp();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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

app.post('/api/v1/room/create', (req, res) => {
  console.log(req.body);
  res.json({roomId: 'deadbeef'});
});

app.get('/api/v1/room/:roomId', (req, res) => {
  console.log('/api/v1/room');
  res.json({roomName: 'テストルーム', gameType: 'Cthulhu', logs: []});
});
export { app };
