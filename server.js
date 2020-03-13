const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 3000
const Cakes = require('./models/cakes.js')
const mongoose = require('mongoose');
const db = mongoose.connection;
const dbupdateobject = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
};

app.use(express.urlencoded({extended:false}))


app.get('/cakes/new', (req, res) => {
  Cakes.create(req.body, (error, createdCakes) => {
    res.render('new.ejs', {cakes:createdCakes})
  })
})

app.get('/cakes/:id', (req, res) => {
  Cakes.findById(req.params.id, (error, foundCakes) => {
    res.render('show.ejs', {cakes:foundCakes})
  })
})

app.get('/', (req, res) => {
  res.send('your application is working...')
})

app.get('/cakes', (req, res) => {
  Cakes.find({}, (error, allCakes) => {
    res.render('index.ejs', {cakes:allCakes})
  })
})

app.post('/cakes', (req, res) => {
  Cakes.create(req.body, (error, createdCakes) => {
    // console.log(createdCakes)
    res.redirect('/cakes')
  })
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
