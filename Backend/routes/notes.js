const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Notes');
const { body, validationResult } = require('express-validator');


// ROUTE 1: Get all the Notes using: GET "/api/note/fetchallnotes". Login required
router.get('/fetchallnotes',fetchuser, async(req,res)=>{
    try{
    const note = await Note.find({user:req.user.id});
    res.json(note);
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 2: Add a new Note using: POST "/api/note/addnote". Login required
router.post('/addnote',fetchuser,[
    body("title", "Title must be atleast 3 Character").isLength({min: 3}),
    body('description', "Description must be atleast 5 Character").isLength({min: 5})
], async(req,res)=>{
    try{
    const { title, description, tag} = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()});
    }
    const note = new Note({
        title, description, tag, user: req.user.id
    })
    const saveNote = await note.save();

    res.json(saveNote)
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
})

// ROUTE 3: Update a Note using: PUT "/api/notes/updatenote/:id". Login required

router.put("/updatenote/:id",fetchuser, async (req,res)=>{
    try{
    const {title, description, tag} = req.body;
    // Create a newNote object
    const newNode = {};
    if(title){newNode.title = title};
    if(description){newNode.description = description};
    if(tag){newNode.tag = tag};

    // Find the Note to be Update
    let note = await Note.findById(req.params.id);
    if(!note){
        return res.status(404).send("Not Found")};
    // Comparing Ids
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not allowed")
    }
    // Updating the notes 
    note = await Note.findByIdAndUpdate(req.params.id,{$set: newNode},{new:true});
    res.json({note});
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 4: Delete a Note using: DELETE "/api/notes/deletenote/:id". Login required
router.delete("/deletenote/:id", fetchuser, async (req,res)=>{

    try{
    // Find the Note to be Delete
    let note = await Note.findById(req.params.id);
    if(!note){
        return res.status(404).send("Not Found");
    }
    // Comparing Ids
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed");
    }
    note = await Note.findByIdAndDelete(req.params.id)
    return res.json({"Success":"Note has been Deleted",note: note});
    }catch(error){
        console.error(error.message);
        return res.status(500).send("Internal Server Error");
    }
})


module.exports = router; 