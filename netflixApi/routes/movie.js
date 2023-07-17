const router = require("express").Router();
const Movie = require("../Models/Movie");
const verify = require("../verifyUser");

//create movie
router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const movie = new Movie(req.body);
    try {
      const newMovie = await movie.save();
      res.status(200).json(newMovie);
    } catch (error) {
      res.status(500).send(error.message);
    }
  } else {
    res.status(403).json("You are not authorized");
  }
});
//update movie
router.put("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const movie = await Movie.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      if (movie) {
        res.status(201).json(movie);
      } else {
        res.status(404).json("Movie not found");
      }
    } catch (error) {
      res.status(501).json("Invalid User");
    }
  } else {
    res.status(403).json("You are not authorized");
  }
});
//delete movie
router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await Movie.findByIdAndDelete(req.params.id);
      res.status(201).json("Movie deleted successfully");
    } catch (error) {
      res.status(404).json("Movie not found");
    }
  } else {
    res.status(403).json("You are not authorized");
  }
});
//find movie
router.get("/find/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.status(201).json(movie);
  } catch (error) {
    res.status(403).json("Something went wrong");
  }
});

// get random movie

router.get("/random", async (req, res) => {
  const type = req.query.type;
  let movie;
  try {
    if (type === "series") {
      movie = await Movie.aggregate([
        { $match: { isSeries: true } },
        { $sample: { size: 1 } },
      ]);
    } else {
      movie = await Movie.aggregate([
        { $match: { isSeries: false } },
        { $sample: { size: 1 } },
      ]);
    }
    res.status(200).json(movie);
  } catch (error) {
    res.status(403).json("Something went wrong");
  }
});

//find all movies
router.get("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const query = req.query.type;
    try {
      if (query === "series") {
        const movies = await Movie.find({ isSeries: true });
        res.status(200).json(movies.reverse());
      } else if (query === "movie") {
        const movies = await Movie.find({ isSeries: false });
        res.status(200).json(movies.reverse());
      } else {
        const movies = await Movie.find({});
        res.status(200).json(movies.reverse());
      }
    } catch (error) {
      res.status(401).json("error");
    }
  } else {
    res.status(403).json("You are not authorized");
  }
});

module.exports = router;
