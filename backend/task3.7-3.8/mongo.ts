const mongoose = require("mongoose");

// if (process.argv.length < 5) {
//   console.log("missing argument");
//   process.exit(1);
// }

const password = process.argv[2];
const url = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const phoneBookSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const PhoneBook = mongoose.model("PhoneBook", phoneBookSchema);

if (process.argv.length === 5) {
  const user_name = process.argv[3];
  const user_number = process.argv[4];

  const phoneBook = new PhoneBook({
    name: user_name,
    number: user_number,
  });

  phoneBook.save().then((result) => {
    console.log(`added ${user_name} number ${user_number} to phonebook`);
    mongoose.connection.close();
  });
}

if (process.argv.length === 3) {
  PhoneBook.find({}).then((result) => {
    console.log(result);
    mongoose.connection.close();
  });
}

// PhoneBook.insertMany([
//   {
//     name: "Arto Hellas",
//     number: "040-123456",
//   },
//   {
//     name: "Ada Loveless",
//     number: "39-44-5323523",
//   },
//   {
//     name: "Dan Abramov",
//     number: "12-43-234345",
//   },
//   {
//     name: "Mary Poppendieck",
//     number: "39-23-6423122",
//   },
// ])
// .then(result => {
//   console.log("phonebook saved");
//   mongoose.connection.close();
// });
