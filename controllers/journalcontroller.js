const router = require('express').Router();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const validateSession = require('../middleware/validate-session');

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
        patient: req.body.journal.patient,
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