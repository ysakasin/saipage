import { ChatServer } from './app';
import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import DataStore from './datastore';
const nanoid = require('nanoid');

let app = new ChatServer().getApp();
let dataStore = new DataStore({ url: 'localhost:27017' });

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

app.get('/api/v1/rooms', (req, res) => {
  dataStore.findAllRooms((err: any, rooms: any) => {
    res.json(rooms);
  });
});

app.post('/api/v1/room/create', (req, res) => {
  const doc = {
    roomId: nanoid(12),
    roomName: req.body.roomName,
    gameType: req.body.gameType,
  };
  dataStore.createRoom(doc);
  res.json(doc);
});

app.get('/api/v1/room/:roomId', (req, res) => {
  dataStore.findRoom(req.params.id, (err: any, room: any) => {
    res.json(room);
  });
});
export { app };
