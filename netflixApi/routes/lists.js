const router = require("express").Router();
const List = require("../Models/List");
const verify = require("../verifyUser");

//create list
router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const list = new List(req.body);
    try {
      const savedList = await list.save();
      res.status(201).json(savedList);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You are not authenticated");
  }
});

//delete list
router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await List.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted !!");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You are not authenticated");
  }
});
//get list

router.get("/", verify, async (req, res) => {
  const typeQuery = req.query.type;
  const genreQuery = req.query.genre;
  let list = [];
  try {
    if (typeQuery) {
      if (genreQuery) {
        list = await List.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery, genre: genreQuery } },
        ]);
      } else {
        list = await List.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery } },
        ]);
      }
    } else {
      list = await List.aggregate([{ $sample: { size: 10 } }]);
    }
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
