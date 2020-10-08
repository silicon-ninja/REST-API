const express = require('express'); // Importing the Express Dependency 
const router = express.Router(); // Accessing the Router
const posts = require('../modules/post'); // Accessing the modules folder
const { request } = require('express');

// Reply from the server.

router.get('/', async (req, res) => {
    try {
        const Post = await posts.find()
        res.json(Post)
    } catch (err) {
        res.json({ message: err });
    }
});

// Search for the specific post 
router.get('/xw', async (req, res) => {
try {
        const post = await posts.findById(req.query.id);
        res.json(post)
    }
    catch (err) {
    res.json({ message: err })};
    });


// Delete the specific post 

router.delete('/', async (req, res) => {
   console.log(req.query.id);
    try {
        const removedNote = await posts.remove({ _id: req.query.id });
        res.json(removedNote);
    }
    catch (err) {
        res.json({ message: err });
    }
});

// Update he specific post 

router.patch('/', async (req, res) => {
    try {
        const updatedNote = await posts.updateMany({ _id: req.query.id },
            {
                $set: {
                    title: req.body.title,
                    description: req.body.description
                }
            }, { multi: true });
    
            
    res.json(updatedNote);
    }
    catch (err) {
        res.json({ message: err });
    }
});

// Submitting the Post 
router.post('/', async (req, res) => { // Response
    console.log(req.body);
    const post = new posts({
        title: req.body.title, // Requesting the Title
        description: req.body.description// Requesting the Description
        
    })
    try {
        const savedpost = await post.save() // Saving it to the Darabase
        res.json(savedpost);
        console.log("Saved"); // Response in JSON
    }
    catch (err) {
        res.json({ message: err }); // Catch the Error
    }

}); 

module.exports = router; // Exporting the Router Variable 
