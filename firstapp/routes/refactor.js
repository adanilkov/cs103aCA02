const express = require('express');
const router = express.Router();
const axios = require('axios');

isLoggedIn = (_,res,next) => {
    if (res.locals.loggedIn) {
      next()
    } else {
      res.redirect('/login')
    }
  }

router.get('/refactor', isLoggedIn, async (req, res) => {
    res.render('refactor')
})

// router.post()

module.exports = router;