const express = require('express'); // Importing the Express Dependency
const router = express.Router(); // Accessing the Router
const posts = require('../modules/post'); // Accessing the modules folder
const { request } = require('express');

// Simple Get Request where you can retrive the data from your DB

router.get('/', async (req, res) => {
  try {
    const Post = await posts.find();
    res.json(Post);
  } catch (err) {
    res.json({ message: err });
  }
});

// Simple Get Request where you can retrive the data from your DB by its ID

router.get('/', async (req, res) => {
  try {
    const post = await posts.findById(req.query.id); // Requesting the _id
    res.json(post);
  } catch (err) {
    res.json({ message: err });
  }
});

// Simple Delete Request where you can delete the data from your DB by its ID

router.delete('/', async (req, res) => {
  console.log(req.query.id); // Requesting the _id
  try {
    const removedNote = await posts.remove({ _id: req.query.id });
    res.json(removedNote);
  } catch (err) {
    res.json({ message: err });
  }
});

// Simple Patch Request where you can Update the data from your DB by its ID

router.patch('/', async (req, res) => {
  try {
    const updatedNote = await posts.updateMany(
      { _id: req.query.id }, // Requesting the _id
      {
        $set: {
          title: req.body.title, // Requesting the Title
          description: req.body.description, // Requesting the Description
        },
      },
      { multi: true }
    );

    res.json(updatedNote);
  } catch (err) {
    res.json({ message: err });
  }
});

// Simple Post Request where you can insert data to your DB with its schema

router.post('/', async (req, res) => {
  // Response
  const post = new posts({
    title: req.body.title, // Requesting the Title
    description: req.body.description, // Requesting the Description
  });
  try {
    const savedpost = await post.save(); // Saving it to the Darabase
    res.json(savedpost);
    console.log('Saved'); // Response in JSON
  } catch (err) {
    res.json({ message: err }); // Catch the Error
  }
});

module.exports = router; // Exporting the Router Variable
