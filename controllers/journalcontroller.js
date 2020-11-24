const router = require('express').Router();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const validateSession = require('../middleWare/validate-session');

// Import the journal model through db.js and store it in the Journal variable.
const Journal = require('../db').import('../models/journal')

/*********************
****JOURNAL CREATE****
**********************/

//Use the router object and access the .post() method
//Etablish path for this method with a subroute
//Call validateSession from the middleware function
router.post('/create', validateSession, (req, res) => {
    console.log(req.body)
    const journalEntry = { //The variable of journalEntry is an object and 'const' means the contents of this variable cannot be changed. (Values can be changed based on user input.)
    // The following lines come from the journal object in the body from the request. 
        patient: req.body.journal.patient,
        journalDate: req.body.journal.journalDate,
        medicationTime: req.body.journal.medicationTime,
        mood: req.body.journal.mood,
        awake: req.body.journal.awake,
        asleep: req.body.journal.asleep,
        dailyNotes: req.body.journal.dailyNotes,
        owner: req.user.id
    }

    Journal.create(journalEntry) //Utilize the Journal variable to access the journal model. .create() is a Sequelize method which will create an instance of the Journal model and send the journalEntry object to the database. 
        .then(journal => {
            res.json({
                journal: journal,
                message: "journal was created successfully",
            })
        })

        .then(journal => res.status(200).json(journal)) // Callback function to run if update is successful and return data entered. .then() captures the promise once resolved and sends a message and the JSON patient entry.
        .catch(err => res.status(500).send(err)) // Utilize the promise rejector method of .catch() to capture any errors
});

/* GET JOURNALS BY PATIENT */

router.get('/:id', validateSession, (req, res) => {
    console.log(req.body)
    Journal.findAll({
        where: {
            patient: req.params.id
        }
    })
    .then(journal => res.json({
        journal: journal
    }))
})


module.exports = router;