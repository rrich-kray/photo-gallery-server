class Validator {
  constructor(property = null) {
    this.property = property;
  }
  // Compare file extension to list of common image file extensions
  validateFileType(req, res, next) {
    const filename = req.files.file.name.split(".");
    const fileType = filename[filename.length - 1];
    const imageTypes = [
      "jpg",
      "png",
      "gif",
      "webp",
      "tiff",
      "psd",
      "raw",
      "bmp",
      "heif",
      "indd",
      "svg",
    ];

    if (!imageTypes.includes(fileType)) {
      res.json("Invalid file type.");
      return;
    }
    next();
  }

  // Check if input contains only letter
  isAlpha(req, res, next) {
    const regex = new RegExp(/^[A-Za-z]+$/, "i");
  }

  // Check if stirng contains the provided seeds
  // options include: isCaseSensitive (boolean) (default: true), minOccurances: (integer) (default 1)
  contains = (req, res, next, seed, options) => {
    // Ensure that user-provided seed is of String type
    if (typeof seed !== String) {
      res.json("Invalid seed provided.");
      return;
    }
    // Create regex using seed.
    const regex = new RegExp(seed, !options.isCaseSensitive ? "g" : "gi");
    regex.matchAll(req.body[this.property]).length >= options.minOccurances
      ? next()
      : res.json("User input does not meet acceptance criteria.");
  };

  equals = (req, res, next, seed) => {
    if (typeof seed !== String || typeof seed !== Number) {
      res.json("Invalid seed provided.");
      return;
    }
    req.body[this.property] === seed
      ? next()
      : res.json("Provided input does not meet acceptance criteria");
  };

  // Validate email matches a specific regex pattern
  validateEmail = (req, res, next) => {
    if (!req.body[this.property]) {
      res.status(400).json("No email found in request body.");
      return;
    }
    req.body[this.property].match(/[\w_\-\.]+@[\w_\-\.]+\.[\w]+/g)
      ? next()
      : res.json("Invalid email provided.");
  };

  // Remove characters from input
  // User will specify req.body item in object parameter
  blacklistSanitize = (req, res, next, items, options) => {
    // Check that user-provided input is of either array or string type
    if (typeof items !== Array || items.length === 0) {
      res.json("Error processing input.");
      return;
    }
    // if string type, split into array and assign to input variable
    input.map((i) => req.body[this.property].replace(i, ""));
    next();
  };

  blacklist = (req, res, next, items, options) => {
    if (typeof items !== Array || items.length === 0) {
      res.json("Error processing input.");
      return;
    }

    items.some((item) => {
      const regex = new RegExp(item, options.isCaseSensitive ? "gi" : "g");
      return regex.match(req.body[this.property]);
    })
      ? res.json({ errorMessage: "request contains blacklisted content" })
      : next();
  };

  trim = (req, res, next) => {
    req.body[this.property].trim();
    next();
  };
}

const checkForToken = (req, res, next) => {
  if (!req.headers.authorization) {
    res.json(
      "You do not have the required permissions to access this resource."
    );
  }
  next();
};

module.exports = { Validator, checkForToken };
