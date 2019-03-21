const express = require('express');
const router = express.Router();
const Data = require('../models/data').Data;
const mongoose = require('mongoose');

router.post('/save', (req, res) => {
  const allData = req.body.allData;
  let data = new Data({
    message: allData,
    createdDate: Date.now()
  });
  data.save((err) => {
    if (err) throw err;
    return res.send(data._id);
  })

})


router.get('/view', (req, res) => {
  
  const id = req.query.id;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      error: 'invaild id',
      code : 1
    })
  }

  Data.findOne({_id: id}, (err, data) => {
    if (err) throw err;
    if (!data) {
      return res.status(401).send({
        error: 'empty data',
        code : 2
      })
    }
    return res.send(data);
  })
})


module.exports = router;