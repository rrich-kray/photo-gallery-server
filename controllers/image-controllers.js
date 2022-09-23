const { Image } = require("../models/");

const imageController = {
  // create a new image entry
  createImage(req, res) {
    Image.create({
      filename: req.body.filename,
      post_id: req.body.post_id,
      isAvatar: req.body.isAvatar,
    })
      .then((response) => {
        console.log(response);
        res.json(response);
      })
      .catch((err) => {
        res.json(err);
      });
  },
};

module.exports = imageController;
