const mongoose = require("mongoose");

const dbConnect = () => {
    const DB_URI = process.env.DB_URI;
    mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err, res) => {
        if (!err) {
            console.log(`   ---> Mongo DB connected succesfully on port 27017  <---`)
        } else {
            console.log(`   ---> Mongo DB server not initializated  <---`);
            console.log(`Error: ${err}`);
        }
    })
}


module.exports = {
    dbConnect
}