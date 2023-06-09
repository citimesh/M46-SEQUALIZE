require("dotenv").config();
const express = require("express");

const Book = require("./books/model");
const Author = require("./author/model");
const Genre = require("./genres/model");

const bookRouter = require("./books/routes");
const authorRouter = require("./author/routes");
const genreRouter = require("./genres/routes");

const port = process.env.PORT || 5001;

const app = express();

app.use(express.json());

const syncTables = () => {
  Author.hasMany(Book);
  Book.belongsTo(Author);
  
  Genre.hasMany(Book);
  Book.belongsTo(Genre);

  Book.sync({ alter: true });
  Author.sync();
  Genre.sync({ alter: true });
};

app.use(bookRouter);
app.use(authorRouter);
app.use(genreRouter);

app.get("/health", (req, res) => {
  res.status(200).json({ message: "App is healthy" });
});

app.listen(port, () => {
  syncTables();
  console.log("Server is listening");
});