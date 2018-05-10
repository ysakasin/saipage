import { ChatServer } from './app';
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import DataStore from './datastore';
import nanoid from 'nanoid';

const chatServer = new ChatServer();
const app = chatServer.getApp();
const io = chatServer.getIo();
const dataStore = DataStore.obj;

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
  dataStore.findRoom(req.params.roomId, (err: any, room: any) => {
    res.json(room);
  });
});

app.delete('/api/v1/rooms/:roomId', (req, res) => {
  const roomId = req.params.roomId;
  const room = io.of('/').adapter.rooms[roomId];
  const sockets = room ? room.sockets : [];
  for (let socketId in sockets) {
    const socket = io.of('/').sockets[socketId];
    if (socket) {
      socket.disconnect(true);
    }
  }
  dataStore.deleteRoom(roomId, (err: any, result: any) => {
    if (!err) {
      res.json({ok: true});
    } else {
      res.json({ok: false});
    }
  });
});
export { app };
