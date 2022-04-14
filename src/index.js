const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const { dbConnect } = require("./config/mongodb");
const {routes} = require ("./routes/routes")
const swaggerDocs = require("./utils/swagger")



app.use(cors());
app.use(express.json());

dbConnect();

swaggerDocs(app, PORT);
app.use("/api/1.0", routes);

const listener = app.listen(PORT, ( () => {
    console.log(`Server is running on port ${PORT}, process ${process.pid}`)
}));

const listeningPort = () => {
    return listener.address().port
};


module.exports = listeningPort