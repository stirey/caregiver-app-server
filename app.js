require('dotenv').config();

const express = require('express');
const app = express();

const sequelize = require('./db');

const user= require('./controllers/usercontroller');
const patient = require('./controllers/patientcontroller')

sequelize.sync();
app.use(express.json());
app.use(require('./middleware/headers'));



app.use('/user', user)

app.use('/patient', patient)

app.listen(process.env.PORT, () => console.log(`App is listening on ${process.env.PORT}`));

// app.use(express.static(__dirname='public'));

// app.get('/',(req,res) => res.render('index'));


