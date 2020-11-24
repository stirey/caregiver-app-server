
const router = require('express').Router();
const jwt= require('jsonwebtoken');
// const { Sequelize } = require('sequelize/types');
const validateSession = require('../middleware/validate-session');
const Patient = require('../db').import('../models/patient')
const {Op}=require ('sequelize');

/*********************
****Patient Create****
***********************/
router.post('/create', validateSession, (req, res) => {
    const patientEntry = {
        name: req.body.patient.name,
        preferredName: req.body.patient.preferredName,
        age: req.body.patient.age,
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
            // sessionToken: token
        })
    })
    .catch(err => res.status(500).send(err))
});

/* *******************************
*******GET ALL ENTRIES************
**********************************/
router.get("/", (req, res) => {
    // findAll is a sequelize method to find all the items and this returns a promise
    Patient.findAll()
    .then(patient => res.status(200).json(patient))
    .catch(err => res.status(500).json({ error: err }))
});

/* ***************************
*******GET ENTRIES BY USER****
*************************** */
router.get("/mine", validateSession, (req, res) => {
    let userid = req.user.id
    Patient.findAll({
        where: { owner: userid}
    })
    .then(patient => res.status(200).json(patient))
    .catch(err => res.status(500).json({ error: err }))
});


/**********************************
*********Find Patient By Name******
********************************* */

router.get('/:name', (req, res) => {

    Patient.findAll({
        where: {
            name: {
                [Op.iLike]:`%${req.params.name}%` //sequelize interprets % as sequences of 0 or more characters
            }
        }
    })
        .then(patient => res.status(200).json(patient))
        .catch(err => res.status(500).json({ error: err }))
});


/*********************************
***UPDATE PATIENT BY NAME*********
**********************************/ 

router.put('/:name', validateSession, (req, res) => {

    const updatePatientEntry = {
        name: req.body.patient.name,
        preferredName: req.body.patient.preferredName,
        age: req.body.patient.age,
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