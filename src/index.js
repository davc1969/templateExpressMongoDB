const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const { dbConnect } = require("./config/mongodb");
const {routes} = require ("./routes/routes")


app.use(cors());
app.use(express.json());

dbConnect();

app.use("/api/1.0", routes);

app.listen(PORT, ( () => {
    console.log(`Server is running on port ${PORT}, process ${process.pid}`)
}))