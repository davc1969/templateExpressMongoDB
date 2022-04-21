const mongoose = require("mongoose");
const { Mongo_DB_URI } = require("./config");
const cOut = require("../utils/cOut");

const dbConnect = () => {
    // const DB_URI = Mongo_DB_URI;
    // cOut.warning("TO URI", Mongo_DB_URI, typeof Mongo_DB_URI);
    mongoose.connect(Mongo_DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    async (err, res) => {
        if (!err) {
            cOut.blue(`   ---> Mongo DB connected succesfully on port 27017  <---`)
            cOut.green(`        ...Database: ${res.connections[0].db.s.namespace.db.toUpperCase()}`);
            const collectionsInDB = await dbCollections(res);
            cOut.green("        ...Collections in DB: ", collectionsInDB)
        } else {
            cOut.error(`   ---> Mongo DB server not initializated  <---`);
            cOut.error(`Error: ${err}`);
        }
    })
};

const dbCollections = async (res) => {
    let collectionArray = [];
    const colls = await mongoose.connection.db.listCollections().toArray();
    colls.forEach( (colItem) => {
        collectionArray.push(colItem.name.toUpperCase())
    })
    return collectionArray
}


module.exports = {
    dbConnect,
    dbCollections
}