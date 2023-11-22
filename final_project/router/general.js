const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


const userExists = (userName)=>{
    let userswithsamename = users.filter((user)=>{
        return user.username === username
      });
      if(userswithsamename.length > 0){
        return true;
      } else {
        return false;
    }
}

public_users.post("/register", (req,res) => {
    let username = req.body.username;
    let password = req.body.password;
    if (userExists(username)) {
        return res.status(404).json({message: "user already exists"});
    }
    if (!username || !password) {
        return res.status(404).json({message: "invalid username or password"});
    }
    users.push({username: username, password: password});
    return res.status(200).json({message: username + " successfully registered"});
});



// Get the book list available in the shop
public_users.get('/',function (req, res) {
    res.send(JSON.stringify(books));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    res.send(books[req.params.isbn]);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    for (let ISBN in books) {
        if (books[ISBN]["author"] === req.params.author) {
            res.send(JSON.stringify(books[ISBN]))
        }
    }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    for (let ISBN in books) {
        if (books[ISBN]["title"] === req.params.title) {
            res.send(JSON.stringify(books[ISBN]))
        }
    }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    res.send(books[req.params.isbn]["reviews"]);
});

module.exports.general = public_users;
