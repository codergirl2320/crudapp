const express = require('express')
const router = express.Router()
const Cakes = require('../models/cakes.js')

router.get('/new', (req, res) => {
  Cakes.create(req.body, (error, createdCakes) => {
    res.render('new.ejs', {cakes:createdCakes})
  })
})

router.get('/:id', (req, res) => {
  Cakes.findById(req.params.id, (error, foundCakes) => {
    res.render('show.ejs', {cakes:foundCakes})
  })
})

router.get('/', (req, res) => {
  Cakes.find({}, (error, allCakes) => {
    res.render('index.ejs', {cakes:allCakes})
  })
})

router.get('/:id/edit', (req, res) => {
  Cakes.findById(req.params.id, (error, foundCakes) => {
    res.render('edit.ejs', {cakes:foundCakes})
  })
})

router.post('/', (req, res) => {
  req.body.img = req.body.img.split(',')
  Cakes.create(req.body, (error, createdCakes) => {
    // console.log(createdCakes)
    res.redirect('/cakes')
  })
})

// router.delete('/:id/removeimg', (req, res) => {
//   Cakes.findByIdAndRemove(req.params.id, (err, data) => {
//     res.redirect('/cakes')
//   })
// })

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

router.put('/:id', (req, res) => {
  req.body.img = req.body.img.split(',')
  Cakes.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedModel) => {
    res.redirect(`/cakes/${req.params.id}`)
  })
})


module.exports = router
