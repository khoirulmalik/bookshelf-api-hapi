/* eslint-disable */
const {
  addBookHandler,
  getAllBook,
  getBookById,
  editBookByHandler,
  deleteBookByIdHandler,
} = require("./handler");

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
  {
    method: "PUT",
    path: "/books/{id}",
    handler: editBookByHandler,
  },
  {
    method: "DELETE",
    path: "/books/id",
    handler: deleteBookByIdHandler,
  },
];

module.exports = routes;
