// require("dotenv").config();
// const mongoose = require("mongoose");
// const PhoneBook = require("./models/phonebook");

// if (process.argv.length === 5) {
//   const user_name = process.argv[3];
//   const user_number = process.argv[4];

//   const phoneBook = new PhoneBook({
//     name: user_name,
//     number: user_number,
//   });

//   phoneBook.save().then((result) => {
//     console.log(`added ${user_name} number ${user_number} to phonebook`);
//     mongoose.connection.close();
//   });
// }

// if (process.argv.length === 3) {
//   PhoneBook.find({}).then((result) => {
//     console.log(result);
//     mongoose.connection.close();
//   });
// }
