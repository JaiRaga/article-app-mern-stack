const mongoose = require("mongoose");
const db = process.env.MONGO_URI

mongoose
  .connect(db)
  .then(() => console.log("Connected to mongodb"))
  .catch((err) => console.log(err));
