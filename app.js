require('dotenv').config();
var cors = require('cors')
const express = require('express');
const app = express();

const sequelize = require('./db');

const user= require('./controllers/usercontroller');
const patient = require('./controllers/patientcontroller')
const journal = require('./controllers/journalcontroller')

sequelize.sync();
app.use(cors())
app.use(express.json());
app.use(require('./middleware/headers'));



app.use('/user', user)

app.use('/patient', patient)

app.use('/journal', journal);

app.listen(process.env.PORT, () => console.log(`App is listening on ${process.env.PORT}`));

// app.use(express.static(__dirname='public'));

// app.get('/',(req,res) => res.render('index'));


