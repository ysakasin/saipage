import { createServer, Server } from 'http';
import express from 'express';
import socketIo from 'socket.io';
import DataStore from './datastore';

let dataStore = DataStore.obj;

export class ChatServer {
  public static readonly PORT: number = 8080;
  private app: express.Application;
  private server: Server;
  private io: SocketIO.Server;
  private port: string | number;

  constructor() {
    this.app = express();
    this.server = createServer(this.app);
    this.port = process.env.PORT || ChatServer.PORT;
    this.io = socketIo(this.server);
    this.listen();
  }

  private listen(): void {
    this.server.listen(this.port, () => {
      console.log('Running server on port %s', this.port);
    });

    this.io.on('connect', (socket: any) => {
      console.log('Connected client on port %s.', this.port);
      socket.on('join', (roomId: string) => {
        console.log('[server](join): %s', roomId);
        socket.join(roomId);
        socket.roomId = roomId;
      });

      socket.on('log', (log: any) => {
        console.log('[server](message): %s', JSON.stringify(log));
        socket.broadcast.to(socket.roomId).emit('log', log);
        dataStore.appendLog(socket.roomId, log);
      });

      socket.on('roomName', (roomName: string) => {
        console.log('[server](roomName): %s', roomName);
        this.io.to(socket.roomId).emit('roomName', roomName);
        dataStore.updateRoomName(socket.roomId, roomName);
      });

      socket.on('gameType', (gameType: string) => {
        console.log('[server](gameType): %s', gameType);
        this.io.to(socket.roomId).emit('gameType', gameType);
        dataStore.updateGameType(socket.roomId, gameType);
      });

      socket.on('addShortcut', (shortcut: string) => {
        console.log('[server](addShortcut): %s', shortcut);
        socket.broadcast.to(socket.roomId).emit('addShortcut', shortcut);
        dataStore.addShortcut(socket.roomId, shortcut);
      })

      socket.on('removeShortcut', (shortcut: string) => {
        console.log('[server](removeShortcut): %s', shortcut);
        socket.broadcast.to(socket.roomId).emit('removeShortcut', shortcut);
        dataStore.removeShortcut(socket.roomId, shortcut);
      })

      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });
  }

  public getApp(): express.Application {
    return this.app;
  }
}
