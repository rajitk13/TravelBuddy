const mongoose = require("mongoose");

const uri =
  "mongodb+srv://admin:1234@travelbuddy.mwmagj8.mongodb.net/?retryWrites=true&w=majority";
mongoose.set("strictQuery", false);
mongoose.connect(uri);
