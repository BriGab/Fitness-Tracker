const db = require("../models")

module.exports = function (app) {
  //Getting all workouts
  app.get("/api/workouts", async function (req, res) {
    try {
      var dbWorkout = await db.Workout.find({})
      res.json(dbWorkout)
    } catch (error) {
      res.json(error)
    }
  })

  //editing existing workouts
  app.put("/api/workouts/:id", ({ params, body }, res) => {
    db.Workout.findByIdAndUpdate(params.id, {
      $push: { exercises: body }
    })
      // .then(({ _id }) => db.Workout.findOneAndUpdate({}, { $push: { workouts: _id } }, { new: true }))
      .then(dbWorkout => {

        res.json(dbWorkout)
      })
      .catch(err => {
        res.json(err)
      });
  });

  app.post("/api/workouts", async ({ body }, res) => {
    try {
      const dbWorkout = await db.Workout.create(body)
      res.json(dbWorkout)
    } catch (error) {
      res.json(error)
    }
  })

  app.get("/api/workouts/range", function(req, res) {
    db.Workout.find({})
    .then(dbWorkout => {

      res.json(dbWorkout)
    })
    .catch(err => {
      res.json(err)
    });
  })
}





// var db = require("../models");

// module.exports = function(app) {
//   app.get("/api/images", function(req, res) {
//     db.Image.find({}).then(function(dbImages) {
//       res.json(dbImages);
//     });
//   });

//   app.put("/api/images/:id", function(req, res) {
//     db.Image.updateOne({ _id: req.params.id }, { rating: req.body.rating }).then(function(dbImage) {
//       res.json(dbImage);
//     });
//   });
// };