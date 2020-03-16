const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const User = require('../models/users.js')

router.get('/new', (req, res) => {
  res.render('session/new.ejs')
})

router.post('/', (req, res) => {
  User.findOne({username:req.body.username}, (error, foundUser) => {
    if(foundUser === null){
      res.redirect('/session/new')
    } else {
      const doesPasswordMatch = bcrypt.compareSync(req.body.password, foundUser.password)
      if(doesPasswordMatch){
        req.session.user=foundUser
        res.redirect('/cakes')
      } else {
        res.redirect('/session/new')
      }
    }
  })
})

router.delete('/', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/')
  })
})

module.exports = router
