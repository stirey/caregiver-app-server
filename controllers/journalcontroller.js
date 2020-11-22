const router = require('express').Router();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const validateSession = require('../middleWare/validate-session');

const Journal = require('../db').import('../models/journal')

// router.get('/practice', validateSession, function (req, res) {
//     res.send("This is a practice route!")
// });

/*********************
****JOURNAL CREATE****
**********************/

router.post('/create', validateSession, (req, res) => {
    console.log(req.body)
    const journalEntry = {
        patient: req.body.journal.patient, // Connect patient to patient.id and owner.id?? (req.patient.id)
        journalDate: req.body.journal.journalDate,
        medicationTime: req.body.journal.medicationTime,
        mood: req.body.journal.mood,
        awake: req.body.journal.awake,
        asleep: req.body.journal.asleep,
        dailyNotes: req.body.journal.dailyNotes,
        owner: req.user.id
    }

    Journal.create(journalEntry)
        .then(journal => {
            res.json({
                journal: journal,
                message: "journal was created successfully",
            })
        })

        .then(journal => res.status(200).json(journal))
        .catch(err => res.status(500).send(err))
});

module.exports = router;