const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req,res) => {
  if (!req.body.password || !req.body.username) {
    return res.status(404).json({message: "Invalid username or password"})
  }

  if (users.some(user => req.body.username === user.username)) {
    return res.status(404).json({message: "User with this username already exists"})
  }
  users.push(req.body);
  return res.status(200).json({message: `User Created: ${req.body.username}`});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  return res.json(books)
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  return res.json(books[isbn])
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author
  const booksList = {}
  for( key in books) {
    if(books[key]['author'] === author) {
      booksList[key] = books[key]
    }
  }
  return res.json(booksList);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title
  const booksList = {}
  for( key in books) {
    if(books[key]['title'] === title) {
      booksList[key] = books[key]
    }
  }
  return res.json(booksList);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn
  return res.json(books[isbn]['reviews'])
});


async function getBooksAsync() {
  let promise = new Promise((resolve, reject) => {
    resolve(books)
  });

  const books = await promise();

  //or

  // promise().then((data) => {
  //   console.log("Books: ", books)
  // })
}

async function getBookByISBNAsync(isbn) {
  let promise = new Promise((resolve, reject) => {
    resolve(books[isbn])
  });

  const books = await promise();

  //or

  // promise().then((data) => {
  //   console.log("Books: ", books)
  // })
}

async function getBooksDetailsByAuthorAsync(author) {
  let promise = new Promise((resolve, reject) => {
    const booksList = {}
    for( key in books) {
      if(books[key]['author'] === author) {
        booksList[key] = books[key]
      }
    }
    resolve(booksList)
  });

  const books = await promise();

  // or

  // promise().then((data) => {
  //   console.log("Books: ", books)
  // })
}

async function getBooksDetailsByTitleAsync(title) {
  let promise = new Promise((resolve, reject) => {
    const booksList = {}
    for( key in books) {
      if(books[key]['title'] === title) {
        booksList[key] = books[key]
      }
    }
    resolve(booksList);
  });

  const books = await promise();

  //or

  // promise().then((data) => {
  //   console.log("Books: ", books)
  // })
}

module.exports.general = public_users;
