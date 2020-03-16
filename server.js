const express = require('express')
const app = express()
// const morgan = require('morgan')
const methodOverride = require('method-override')
require('dotenv').config()
const port = process.env.PORT || 3000
// const Cakes = require('./models/cakes.js')
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const session = require('express-session')
const db = mongoose.connection;
const dbupdateobject = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
};

app.use(express.urlencoded({extended:false}))
app.use(session({secret:'feedmeseymour', resave:false, saveUninitialized:false}))
app.use(methodOverride('_method'))
// app.use(morgan('tiny'))
app.use(express.static('public'))

const cakesController = require('./controllers/cakes_ctrl.js')
app.use('/cakes', cakesController)

const usersController = require('./controllers/users.js')
app.use('/users', usersController)

const sessionController = require('./controllers/session.js')
app.use('/session', sessionController)

app.get('/', (req, res) => {
  res.render('home.ejs')
})

// Connect to Mongo
mongoose.connect(process.env.DATABASE_URL, dbupdateobject);

// Connection Error/Success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: '));
db.on('disconnected', () => console.log('mongo disconnected'));
db.on('open', () => {
    console.log('Connection made!');
});


app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
