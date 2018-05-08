import { MongoClient, ObjectId, Db } from 'mongodb';
import { connect } from 'net';

export default class DataStore {
  private static _obj: DataStore;
  private client: MongoClient;
  private db: Db;

  public static get obj(): DataStore {
    if (!this._obj) {
      this._obj = new DataStore({});
    }
    return this._obj;
  }

  constructor(config: any) {
    MongoClient.connect('mongodb://localhost:27017', (err, client) => {
      if (err) throw err;
      this.client = client;
      this.db = this.client.db('saibox');
    });
  }

  public quit() {
    this.client.close();
  }

  public createRoom(doc: any) {
    this.db.collection('rooms').insert(doc);
  }

  public findAllRooms(callback: any) {
    this.db.collection('rooms').find().toArray(callback);
  }

  public findRoom(id: string, callback: any) {
    this.db.collection('rooms').findOne({ roomId: id }, callback);
  }

  public updateRoomName(id: string, roomName: string) {
    this.db.collection('rooms').update({ roomId: id }, { $set: { roomName } });
  }

  public updateGameType(id: string, gameType: string) {
    this.db.collection('rooms').update({ roomId: id }, { $set: { gameType } });
  }

  public appendLog(roomId: string, log: any) {
    this.db.collection('rooms').update({ roomId }, { $push: { logs: log } });
  }
}
