import { MongoClient, ObjectId, Db } from "mongodb";
import { connect } from "net";
import bcrypt from "bcrypt";

export default class DataStore {
  public static readonly MONGO_URI: string = "mongodb://localhost:27017";
  private static _obj: DataStore;
  private client: MongoClient | undefined;
  private db: Db | undefined;
  private mongoURI: string;

  public static get obj(): DataStore {
    if (!this._obj) {
      this._obj = new DataStore({});
    }
    return this._obj;
  }

  constructor(config: any) {
    this.mongoURI = process.env.MONGO_URI || DataStore.MONGO_URI;
    MongoClient.connect(this.mongoURI, (err, client) => {
      if (err) throw err;
      this.client = client;
      this.db = this.client.db("saibox");
    });
  }

  public quit() {
    if (this.client) {
      this.client.close();
      this.client = undefined;
    }
  }

  public auth(
    roomId: string,
    password: string,
    callback: (authed: boolean) => void
  ) {
    this.findRoom(roomId, (error: any, result: any) => {
      if (error) {
        callback(false);
      } else if (!result.hashedPassword) {
        // '' is false
        callback(true);
      } else if (bcrypt.compareSync(password, result.hashedPassword)) {
        callback(true);
      } else {
        callback(false);
      }
    });
  }

  public createRoom(doc: any) {
    this.db!.collection("rooms").insert(doc);
  }

  public findAllRooms(callback: any) {
    this.db!.collection("rooms")
      .aggregate([{ $project: { logs: 0, shortcuts: 0 } }])
      .toArray(callback);
  }

  public findRoom(id: string, callback: any) {
    this.db!.collection("rooms").findOne({ roomId: id }, callback);
  }

  public deleteRoom(id: string, callback: any) {
    this.db!.collection("rooms").remove({ roomId: id }, callback);
  }

  public updateRoomName(id: string, roomName: string) {
    this.db!.collection("rooms").update({ roomId: id }, { $set: { roomName } });
  }

  public updateGameType(id: string, gameType: string) {
    this.db!.collection("rooms").update({ roomId: id }, { $set: { gameType } });
  }

  public appendLog(roomId: string, log: any) {
    this.db!.collection("rooms").update({ roomId }, { $push: { logs: log } });
  }

  public addShortcut(roomId: string, shortcut: string) {
    this.db!.collection("rooms").update(
      { roomId },
      { $addToSet: { shortcuts: shortcut } }
    );
  }

  public removeShortcut(roomId: string, shortcut: string) {
    this.db!.collection("rooms").update(
      { roomId },
      { $pull: { shortcuts: shortcut } }
    );
  }
}
