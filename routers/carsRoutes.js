const express = require('express');

const router = express.Router();

const database = require('../data/dbConfig.js');

//Route is based on host.com/api/cars
router.post('/', validateCar(), (req, res) => {

  database("cars").insert({ vin:req.body.vin, make:req.body.make, model: req.body.make, mileage:req.body.mileage })
    .then( data => {
      res.status(200).json(data);
    })
    .catch( err => { res.status(500).json({errorMessage:"There was an error creating a car."})})

});

router.get('/', (req, res) => {
  database("cars")
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => { res.status(500).json({errorMessage:"There was an error retrieving the cars."})})
});

router.get('/:id', validateCarID(), (req, res) => {

    res.status(200).json(req.car);
});



//middleware
function validateCarID() {

  return (req, res, next) => {
    database("cars").where("id", req.params.id)
      .then(data =>{
        if(data.length > 0){
          req.car = data[0];
          next();
        } else {
          res.status(400).json({errorMessage:"invalid car id"});
        }
      })
      .catch(err => res.status(500).json({errorMessage:"Error while searching for car ID"}))
  }
}

function validateCar() {

  return (req, res, next) => {
    if(req.body){
      if(req.body.vin){
        database("cars").where({ vin: req.body.vin})
          .then(data => {

            if(data.length < 1){
              if(req.body.make){
                if(req.body.model){
                  if(req.body.mileage){
                    next();
                  } else {
                    res.status(400).json({errorMessage:"your car requires mileage."})
                  }
                } else {
                  res.status(400).json({errorMessage:"your car requires a model."})
                }

              } else {
                res.status(400).json({errorMessage:"missing requires a make."})
              }
            } else {
              res.status(400).json({errorMessage:"That vin already exists!"})
            }
          })
          .catch(err => res.status(500).json({errorMessage:"failed to retrieve vin from server."}))

      } else {
        res.status(400).json({errorMessage:"missing required vin field"});
      }
    } else {
      res.status(400).json({errorMessage:"missing car data"});
    }
  }
}


module.exports = router;
