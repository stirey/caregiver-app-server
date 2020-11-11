require('dotenv').config();
const sequelize = require('./db')
const express = require('express');
const app = express();

const user= require('./controllers/usercontroller');
const patient = require('./controllers/patientcontroller')

sequelize.sync();

app.use(express.json());
app.use(require('./middleware/headers'))

app.use('/user', user)

app.use('/patient', patient)

app.listen(process.env.PORT, () => console.log(`App is listening on ${process.env.PORT}`));

// app.get('/',(req,res) => res.render('index'));
// app.use(express.static(__dirname='public'));

