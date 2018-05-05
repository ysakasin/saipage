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
    this.createApp();
    this.config();
    this.createServer();
    this.sockets();
    this.listen();
  }

  private createApp(): void {
    this.app = express();
  }

  private createServer(): void {
    this.server = createServer(this.app);
  }

  private config(): void {
    this.port = process.env.PORT || ChatServer.PORT;
  }

  private sockets(): void {
    this.io = socketIo(this.server);
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

      socket.on('log', (m: any) => {
        console.log('[server](message): %s', JSON.stringify(m));
        socket.broadcast.to(socket.roomId).emit('log', m);
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

      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });
  }

  public getApp(): express.Application {
    return this.app;
  }
}
