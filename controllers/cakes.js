const express = require('express')
const router = express.Router()
const Cakes = require('../models/cakes.js')


// const cakeSeed = require('../models/seed.js')
//
// Cakes.create(cakeSeed, (err, data) => {
//     if (err) console.log (err.message)
//       console.log( "added provided hotel data" )
//     }
// );

// Cakes.collection.drop();


router.get('/new', (req, res) => {
  Cakes.create(req.body, (error, createdCakes) => {
    res.render('cakes/new.ejs', {cakes:createdCakes})
  })
})

router.get('/:id', (req, res) => {
  Cakes.findById(req.params.id, (error, foundCakes) => {
    res.render('cakes/show.ejs', {cakes:foundCakes})
  })
})

router.get('/', (req, res) => {
  if(req.session.user){
    Cakes.find({}, (error, allCakes) => {
      // console.log(allCakes)
      res.render('cakes/index.ejs', {cakes:allCakes, user:req.session.user})
    })
  } else {
    res.redirect('/')
  }
})

router.get('/:id/edit', (req, res) => {
  Cakes.findById(req.params.id, (error, foundCakes) => {
    res.render('cakes/edit.ejs', {cakes:foundCakes})
  })
})

router.post('/', (req, res) => {
  req.body.img = req.body.img.split(',')
  Cakes.create(req.body, (error, createdCakes) => {
    // console.log(createdCakes)
    res.redirect('/cakes')
  })
})

router.delete('/:id', (req, res) => {
  Cakes.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect('/cakes')
  })
})

router.put('/:id/img', (req, res) => {
  req.body.img = req.body.img.split(',')
  img = req.body.img
  Cakes.findByIdAndUpdate(req.params.id, {$push: {img:img}}, (err, updatedModel) => {
    console.log(updatedModel)
    res.redirect(`/cakes/${req.params.id}/edit`)
  })
})

router.put('/:id/qty', (req, res) => {
  Cakes.findByIdAndUpdate(req.params.id, {$inc: {qty:-1}}, (err, updatedModel) => {
    res.redirect(`/cakes/${req.params.id}`)
  })
})

router.put('/:id', (req, res) => {
  req.body.img = req.body.img.split(',')
  Cakes.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedModel) => {
    res.redirect(`/cakes/${req.params.id}`)
  })
})


module.exports = router
