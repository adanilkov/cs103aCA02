const express = require('express');
const router = express.Router();
const axios = require('axios');
const { isLoggedIn } = require('./pwauth');

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

router.get('/refactor/gpt', isLoggedIn, async (req, res) => {
    if (req.body.prompt != null) {
        res.status(204).json({error: 'no prompt'}).send();
    } else {
        const resp = await axios.post('http://gracehopper.cs-i.brandeis.edu:3500/openai',
            {prompt:req.body.prompt})

        res.status(200).send(resp.data.choices[0]['message']['content']);
    }
})

module.exports = router;