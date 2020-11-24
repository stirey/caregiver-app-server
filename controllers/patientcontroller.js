const router = require('express').Router();

const {Op} = require ('sequelize');

const validateSession = require('../middleware/validate-session');

// Import the patient model through db.js and store it in the Patient variable.
const Patient = require('../db').import('../models/patient')
const {Op}=require ('sequelize');

/*********************
****PATIENT CREATE****
**********************/

//Use the router object and access the .post() method
//Etablish path for this method with a subroute
//Call validateSession from the middleware function
router.post('/create', validateSession, (req, res) => { //validateSession allows access to the user object and dotnotation makes it possible to attach the user's id to a specific patient.
console.log(req.body)
    const patientEntry = { // Create a variable called patientEntry. This variable is an object and 'const' means the contents of this variable cannot be changed. (Values can be changed based on user input.)
    // The following lines come from the patient object in the body from the request. 
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

    Patient.create(patientEntry) //Utilize the variable Patient to access the patient model. .create() is a Sequelize method which will create an instance of the Patient model and send the patientEntry object to the database. 
        .then(patient => { 
            res.json({
                patient: patient,
                message: "patient was created successfully",
            })
        })

        .then(patient => res.status(200).json(patient)) // Callback function to run if update is successful and return data entered. .then() captures the promise once resolved and sends a message and the JSON patient entry.
        .catch(err => res.status(500).send(err)) // Utilize the promise rejector method of .catch() to capture any errors
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

router.put('/:name', validateSession, (req, res) => { // PUT updates the exisiting information with new content from the user. validateSession maintains protected views.

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

    const query = { where: { name: req.params.name } }; // This ensures that the update is applied to the correct patient 

    Patient.update(updatePatientEntry, query) // update is a Sequelize method that takes two arguments: the first contains an object holding the new value with user updated data, the second argument tells Sequelize where to place the new data if a match is found.
        .then((patient) => res.status(200).json(patient)) // Callback function to run if update is successful and return data entered.
        .catch(err => res.status(500).json({ error: err })) // Callback function to run if update is NOT successful and return an error message.
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