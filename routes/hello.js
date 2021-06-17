var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.send('Hello Farmosa!\n');
    console.log('Send hello Farmosa message.')
  });
  
router.get('/:name', function (req, res) {
  res.send('Hello '+req.params.name+'!\n');
  console.log('Send hello message.')
});

module.exports = router;
