import express, { Request, Response } from "express";
const app = express();

app.use(express.json());

var morgan = require("morgan");

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Loveless",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const unknwonEndPoint = (request, response) => {
  response.status(400).send({ error: "unknown endpoint" });
};
app.use(unknwonEndPoint);

app.get("/api/persons", (request: Request, response: Response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request: Request, response: Response) => {
  const id = request.params.id;
  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

const generateRandomId = (max: number) => {
  return Math.floor(Math.random() * max);
};

app.post("/api/persons", (request: Request, response: Response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: !body.number ? "number missing" : "name missing",
    });
  }
  if (persons.some((obj) => obj.name === body.name)) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }
  const person: { id: string; name: string; number: string } = {
    id: generateRandomId(1000).toLocaleString(),
    name: body.name,
    number: body.number,
  };
  persons = persons.concat(person);
  response.json(person);
});

app.delete("/api/persons/:id", (request: Request, response: Response) => {
  const id = request.params.id;
  const result = persons.filter((person) => person.id !== id);
  response.status(204).end();
  response.json(result);
});

app.get("/info", (request: Request, response: Response) => {
  const date = new Date();
  response.send(
    `<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`
  );
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
