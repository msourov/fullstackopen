const mongoose = require("mongoose");
const url = process.env.MONGODB_URI;
mongoose.set("strictQuery", false);
require("dotenv").config();

console.log("connecting to", url);

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => console.log("Error connecting to MongoDB", error.message));

const phoneBookSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: String,
  status: String,
});

phoneBookSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id, delete returnedObject.__v;
  },
});

module.exports = mongoose.model("PhoneBook", phoneBookSchema);
