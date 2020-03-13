const express = require('express')
const app = express()
const methodOverride = require('method-override')
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
app.use(methodOverride('_method'))
app.use(express.static('public'))


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

app.get('/cakes/', (req, res) => {
  Cakes.find({}, (error, allCakes) => {
    res.render('index.ejs', {cakes:allCakes})
  })
})

app.get('/cakes/:id/edit', (req, res) => {
  Cakes.findById(req.params.id, (error, foundCakes) => {
    res.render('edit.ejs', {cakes:foundCakes})
  })
})




// app.post('/cakes/', (req, res) => {
//   Cakes.create(req.body, (error, createdCakes) => {
//     // console.log(createdCakes)
//     res.redirect('/cakes')
//   })
// })

app.post('/cakes/', (req, res) => {
  req.body.img = req.body.img.split(',')
  Cakes.create(req.body, (error, createdCakes) => {
    // console.log(createdCakes)
    res.redirect('/cakes')
  })
})




app.delete('/cakes/:id', (req, res) => {
  Cakes.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect('/cakes')
  })
})

app.put('/cakes/:id', (req, res) => {
  Cakes.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedModel) => {
    res.redirect(`/cakes/${req.params.id}`)
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
