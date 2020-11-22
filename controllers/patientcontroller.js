const router = require('express').Router();

const {Op} = require ('sequelize');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const validateSession = require('../middleware/validate-session');

const Patient = require('../db').import('../models/patient')

/*********************
****PATIENT CREATE****
**********************/

router.post('/create', validateSession, (req, res) => {
console.log(req.body)
    const patientEntry = {
        name: req.body.patient.name,
        preferredName: req.body.patient.preferredName,
        age: parseInt(req.body.patient.age),
        birthSex: req.body.patient.birthSex,
        race: req.body.patient.race,
        location: req.body.patient.location,
        medication: req.body.patient.medication,
        careStart: req.body.patient.careStart,
        caregiverNotes: req.body.patient.caregiverNotes,
        owner: req.user.id
    }

    Patient.create(patientEntry)
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

router.get('/:name', (req, res) => {

    Patient.findAll({
        where: {
            name: {
            [Op.iLike]:`%${req.params.name}%`
        }}
    })
        .then(patient => res.status(200).json(patient))
        .catch(err => res.status(500).json({ error: err }))
});

/***************************
***UPDATE PATIENT BY NAME***
****************************/

router.put('/:name', validateSession, (req, res) => {

    const updatePatientEntry = {
        name: req.body.patient.name,
        preferredName: req.body.patient.preferredName,
        age: parseInt(req.body.patient.age),
        birthSex: req.body.patient.birthSex,
        race: req.body.patient.race,
        location: req.body.patient.location,
        medication: req.body.patient.medication,
        careStart: req.body.patient.careStart,
        caregiverNotes: req.body.patient.caregiverNotes,
        owner: req.user.id
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