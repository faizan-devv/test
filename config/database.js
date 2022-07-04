const mongoose = require('mongoose');
require("dotenv").config({ path: "config/config.env" });

function connectDatabase() {
  mongoose.connect(process.env.DB_LOCAL_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(con => {
    console.log(`MongoDB Database connected with HOST: ${con.connection.host}`);
  });
}

module.exports = connectDatabase;