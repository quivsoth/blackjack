import { MongoClient, Db } from "mongodb";

export class DbClient {
    public db: Db;

    public connect() {
        var server = require('mongodb').Server;

        MongoClient.connect("mongodb://localhost:27017", {}, (err, db) => {
            if (err) {
                console.log(err);
            } else {
                //this.db = db;
                console.log("connected");
            }
        });
    }
}
//export = new DbClient();