import { MongoClient, ObjectId, Db } from 'mongodb';
import { connect } from 'net';

export default class DataStore {
  private client: MongoClient;
  private db: Db;

  constructor(config: any) {
    MongoClient.connect('mongodb://localhost:27017', (err, client) => {
      if (err) throw err;
      this.client = client;
      this.db = this.client.db('dice-room');
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
    this.db.collection('rooms').findOne({ id }, callback);
  }
}
