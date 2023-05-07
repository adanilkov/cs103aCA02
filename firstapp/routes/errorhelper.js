const express = require('express')
const router = express.Router()
const axios = require('axios');

isLoggedIn = (_,res,next) => {
    if (res.locals.loggedIn) {
      next()
    } else {
      res.redirect('/login')
    }
  }

router.get('/errorhelper/', isLoggedIn, async (req, res) => {
    res.render('errorhelper')
    console.log("rendered")
})

router.post('/interview/gpt', isLoggedIn, async (req, res) => {
    console.log("hit");
    if (req.body.prompt != null) {
        const resp = await axios.post('http://gracehopper.cs-i.brandeis.edu:3500/openai',
        {prompt:req.body.prompt})
        res.status(200).send(resp.data.choices[0]['message']['content']);
    } else {
        res.status(204).json({error: 'no prompt'}).send();
    }
})

module.exports = router;