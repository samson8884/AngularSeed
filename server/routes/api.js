const express = require('express');
const router = express.Router();

/* GET api listing. */
router.get('/getdata', (req, res) => {
  return res.json({
      'status' : 'success'
  });
});

module.exports = router;