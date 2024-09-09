const express = require("express");
const path = require("path");
require("dotenv").config();
const PhoneBook = require("./models/phonebook");

const app = express();
app.use(express.static(path.resolve(__dirname, "./dist")));

app.get("/api/persons", (request, response) => {
  PhoneBook.find({})
    .then((result) => response.status(200).json(result))
    .catch((error) => response.status(500).send({ error: error.message }));
});

app.get("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  PhoneBook.findById(id)
    .then((result) => {
      if (result) {
        response.json(result);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.post("/api/persons", async (request, response) => {
  const body = request.body;

  const personExists = await PhoneBook.findOne({ name: body.name });

  if (personExists) {
    const updatedPerson = await PhoneBook.findByIdAndUpdate(
      personExists._id,
      { number: body.number, status: body.status },
      { new: true, runValidators: true }
    );
    return response.status(200).json(updatedPerson);
  }

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: !body.number ? "number missing" : "name missing",
    });
  }
  const person = new PhoneBook({
    name: body.name,
    number: body.number,
    status: body.status,
  });
  person
    .save()
    .then((result) => response.status(200).json(result))
    .catch((error) => response.status(400).send({ error: error.message }));
});

app.use(express.json());

app.put("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const body = request.body;
  // const updatedPerson = {
  //   name: body.name,
  //   number: body.number,
  // };
  console.log(body);

  PhoneBook.findByIdAndUpdate(id, body, { new: true, runValidators: true })
    .then((updatedPerson) => {
      if (updatedPerson) response.json(updatedPerson);
      else response.status(404).send({ error: "Person not found" });
    })
    .catch((error) => {
      console.error("Error updating person:", error.message);
      response.status(400).send({ error: error.message });
    });
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  PhoneBook.deleteOne({ _id: id }).then((result) => {
    if (result.deletedCount === 1) response.json(result);
    else response.status(404).json({ error: error.message });
  });
});

// app.get("/info", (request, response) => {
//   const date = new Date();
//   response.send(
//     `<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`
//   );
// });

const unknwonEndPoint = (request, response) => {
  response.status(400).send({ error: "unknown endpoint" });
};
app.use(unknwonEndPoint);

const errorHandler = (err, req, res, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformed id" });
  }
  next(error);
};

app.use(errorHandler);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
