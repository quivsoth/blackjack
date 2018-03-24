"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongodb_1 = require("mongodb");
var DbClient = /** @class */ (function () {
    function DbClient() {
    }
    DbClient.prototype.connect = function () {
        var server = require('mongodb').Server;
        mongodb_1.MongoClient.connect("mongodb://localhost:27017", {}, function (err, db) {
            if (err) {
                console.log(err);
            }
            else {
                //this.db = db;
                console.log("connected");
            }
        });
    };
    return DbClient;
}());
exports.DbClient = DbClient;
//export = new DbClient(); 
//# sourceMappingURL=mongo.js.map