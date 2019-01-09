const express = require('express');
const router = express.Router();
const request = require('request-promise');
const masterConfig = require('../../config/masterConfig.json');

var apiURL = masterConfig.apiURL;

/* GET api listing. */
router.get('/getdata', (req, res) => {
// Uncomment this if you want to return data from node.js server
//    return res.json({
//      'status' : 'success'
//    });
    
// Use this to use node.js server as a proxy and get data from a remote server
    const options = {
        method: 'GET',
        uri: apiURL + '/posts/1',
        json: true,
//        qs: {
//            param1: req.query.param1,
//            param2: req.query.param2
//        },
//        strictSSL: false
    }
    
    request(options)
        .then(function (response) {
            return res.json(response);
        })
        .catch(function (err) {
            // Deal with the error
            console.log("error in /getdata")
            console.log(err)            
            res.status(err.statusCode);
            var errorMsg = err.message ? err.message : 'error getting getdata';
            return res.send(errorMsg);
        });
});

module.exports = router;