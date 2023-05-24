const mongoURI =
  "mongodb+srv://movie:movie@cluster0.ydpnlle.mongodb.net/movies?retryWrites=true&w=majority";
const mongoose = require("mongoose");

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connection established with mongodb server online");
  })
  .catch((err) => {
    console.log("error while connection", err);
  });

module.exports = mongoose.connection;
