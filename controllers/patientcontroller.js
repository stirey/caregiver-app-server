
const router = require('express').Router();


const jwt= require('jsonwebtoken');
const bcrypt= require('bcryptjs');

const validateSession = require('../middleware/validate-session');
const Patient = require('../db').import('../models/patient')



/*********************
****Patient Create****
***********************/
router.post('/create', validateSession, (req, res) => {
    const patientEntry = {
        name: req.body.patient.name,
        preferredName: req.body.patient.preferredName,
        age: req.body.patient.age,
        gender: req.body.patient.gender,
        race: req.body.patient.race,
        ethnicity: req.body.patient.ethnicity,
        location: req.body.patient.location,
        medication: req.body.patient.medication,
        careStart: req.body.patient.careStart,
        caregiverNotes: req.body.patient.caregiverNotes,
        owner: req.user.id
    }
        Patient.create(patientEntry)
        
        // .catch(err => res.status(500).json({error: err}))

        .then(patient => {
    
            res.json({
                patient: patient,
                message: "patient was created successfully",
            })
        })
        .then(patient => res.status(200).json(patient))
        .catch(err => res.status(500).send(err))
    });

/*********************
***GET ALL PATIENTS***
**********************/

router.get("/", (req, res) => {
    Patient.findAll()
        .then(patient => res.status(200).json(patient))
        .catch(err => res.status(500).json({ error: err }))
});

/***************************
***GET PATIENTS BY USER***
***************************/

router.get('/mine', validateSession, (req, res) => {
    Patient.findAll({
        where: { owner: req.user.id }
    })
        .then(patient => res.status(200).json(patient))
        .catch(err => res.status(500).json({ error: err }))
});

/*************************
***FIND PATIENT BY NAME***
**************************/

router.get('/search/:name', (req, res) => {

    Patient.findOne({
        where: {
            name: req.params.name
        }
    })
        .then(patient => res.status(200).json(patient))
        .catch(err => res.status(500).json({ error: err }))
});

/***************************
***UPDATE PATIENT BY NAME***
****************************/

router.put('/update/:name', validateSession, (req, res) => {

    const updatePatientEntry = {
        name: req.body.patient.name,
        age: req.body.patient.age,
        location: req.body.patient.location,
        medication: req.body.patient.medication,
        careStart: req.body.patient.careStart,
        careEnd: req.body.patient.careEnd,
        caregiverNotes: req.body.patient.caregiverNotes,
    }

    const query = { where: { name: req.params.name } };

    Patient.update(updatePatientEntry, query)
        .then((patient) => res.status(200).json(patient))
        .catch(err => res.status(500).json({ error: err }))
});

/*************************
***DELETE PATIENT BY ID***
**************************/

router.delete('/:id', validateSession, async (req, res) => {
    try {
        const result = await Patient.destroy({
            where: { id: req.params.id }
        });

        res.status(200).json(result)
    } catch (err) {
        res.status(500).json({ error: err });
    }
})

module.exports = router;