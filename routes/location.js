var express = require("express");
var router = express.Router();
require('dotenv').config();
/* GET users listing. */
router.get("/:zipcode", function(req, res, next) {
//   res.send("respond with a resource");
  var scales = req.query.scale
  var temp = ''
  if (scales == 'Celsius'){
      temp = "&units=metric"
  }
  else if (scales == 'Fahrenheit'){
    temp = "&units=imperial"
  }
  else if(typeof scales == "undefined"){
    temp = "&units=imperial"
    scales = "Fahrenheit"
  }
  var request = require("request");
  var options = {
    method: "GET",
    url:
      "https://api.openweathermap.org/data/2.5/weather?zip="+req.params.zipcode+"&appid="+process.env.KEY+temp,
    headers: {}
  };

  request(options, function(err, response, body){
      if (response.statusCode == 200){
        let json = JSON.parse(body);
        res.writeHead(200, {'content-type': 'application/json'})
        res.write(JSON.stringify({ temperature: json.main.temp, scale: scales }))
        res.end();
      }
      else if(response.statusCode == 404){
        let json = JSON.parse(body);
        res.writeHead(404, {'content-type': 'application/json'})
        res.write(JSON.stringify(json))
        res.end();
      }
  });

});

module.exports = router;
