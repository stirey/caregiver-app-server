
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
        age: req.body.patient.age,
        location: req.body.patient.age,
        medication: req.body.patient.medication,
        careStart: req.body.patient.careStart,
        careEnd: req.body.patient.careEnd,
        caregiverNotes: req.body.patient.caregiverNotes,
        owner: req.user.id
    }
        Patient.create(patientEntry)
        .then(patient => res.status(200).json(patient))
        .catch(err => res.status(500).json({error: err}))
    });
//     .then(patient => {
//         const token =jwt.sign({id:user.id}, process.env.JWT_SECRET,
//             {expiresIn: "30d"})

//         res.json({
//             patient: patient,
//             message: "patient was created successfully",
//             sessionToken: token
//         })
//     })
//     .catch(err => res.status(500).send(err))
// });



module.exports = router;