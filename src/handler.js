/* eslint-disable */

const { nanoid } = require("nanoid");
const books = require("./books");

const addBookHandler = (req, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.payload;

  const id = nanoid(16);
  let finished = false;
  if (pageCount <= readPage) {
    finished = true;
  }
  const insertedAt = new Date().toISOString();
  const updateAt = insertedAt;

  if (!name) {
    return h
      .response({
        status: "fail",
        message: "Gagal menambahkan buku. Mohon isi nama buku",
      })
      .code(400);
  }

  if (readPage > pageCount) {
    return h
      .response({
        status: "fail",
        message:
          "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
      })
      .code(400);
  }

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updateAt,
  };

  books.push(newBook);
  const isSuccess = books.filter((book) => book.id === id).length > 0;
  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: id,
      },
    });
    response.code(201);
    console.log(newBook);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Gagal Menambahkan Buku",
  });
  response.code(400);
};

const getAllBook = (request, h) => {
  const displayBooks = books.map((item) => {
    const container = {};

    container.id = item.id;
    container.name = item.name;
    container.publisher = item.publisher;

    return container;
  });

  const response = h.response({
    status: "success",
    data: {
      books: displayBooks,
    },
  });

  response.code(201);
  return response;
};

const getBookById = (req, h) => {
  const { id } = req.params;

  const findBook = (book) => {
    if (book.id === id) {
      return book.id;
    }
  };

  const isSucces = books.find(findBook);

  if (!isSucces) {
    const response = h.response({
      status: "Fail",
      message: "Buku Tidak Ditemukan",
    });

    response.code(404);
    return response;
  }

  const response = h.response({
    status: "Succes",
    message: "Buku Berhasi Ditemukan",
    data: {
      book: isSucces,
    },
  });
  response.code(201);
  return response;
};

const editBookByHandler = (req, h) => {
  const { id } = req.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.payload;

  if (!name) {
    const response = h.response({
      status: "fail",
      message: "Gagal memperbarui buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message:
        "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);
    return response;
  }

  const updatedAt = new Date().toISOString();

  const index = books.findIndex((book) => book.id === id);
  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };
  }

  const response = h.response({
    status: "success",
    message: "Buku berhasil diperbarui",
  });
  response.code(200);
  return response;
};

const deleteBookByIdHandler = (request, h) => {
  const { id } = request.params;

  const index = books.findIndex((book) => book.id === id);

  if (index === -1) {
    const response = h.response({
      status: "fail",
      message: "Buku gagal dihapus. Id tidak ditemukan",
    });
    response.code(404);
    return response;
  }

  books.splice(index, 1);

  const response = h.response({
    status: "success",
    message: "Buku berhasil dihapus",
  });
  response.code(200);
  return response;
};
module.exports = { addBookHandler, getAllBook, getBookById, editBookByHandler,deleteBookByIdHandler}