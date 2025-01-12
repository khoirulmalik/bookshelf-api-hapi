/* eslint-disable */
const { addBookHandler, getAllBook, getBookById } = require("./handler");

const routes = [
  {
    method: "POST",
    path: "/books",
    handler: addBookHandler,
  },
  {
    method: "GET",
    path: "/books",
    handler: getAllBook,
  },
  {
    method: "GET",
    path: "/books/{id}",
    handler: getBookById,
  },
];

module.exports = routes;
