require('dotenv').config();

const express = require('express');

const app = express();

app.listen(process.env.PORT, () => console.log(`App is listening on ${process.env.PORT}`));

app.use(express.static(__dirname='public'));

app.get('/',(req,res) => res.render('index'));

const user= require('./controllers/usercontroller');
app.use('/user', user)