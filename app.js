require('dotenv').config();

const express = require('express');
const app = express();

const sequelize = require('./db');
sequelize.sync();

/* CONTROLLERS */
const user= require('./controllers/usercontroller');
const patient = require('./controllers/patientcontroller');
const journal = require('./controllers/journalcontroller')


app.use(express.json());
app.use(require('./middleWare/headers'));


/* MODELS */
app.use('/user', user)
app.use('/patient', patient)
app.use('/journal', journal);


app.listen(process.env.PORT, () => {
    console.log(`Server is listening on ${process.env.PORT}`)
});
