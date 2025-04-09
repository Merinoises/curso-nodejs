const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const MONGODB_URI = process.env.MONGODB_URI;

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect(
            MONGODB_URI
        )
            .then(client => {
                console.log('Connected!');
                _db = client.db('shop');
                callback();
            })
            .catch(err => {
                console.log(err);
                throw err;
            });
}

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No database found!';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;