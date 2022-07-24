class Validator {
  constructor(property) {
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

  // Check if stirng contains the provided seeds
  // options include: isCaseSensitive (boolean), minOccurances: (integer) (default 1)
  contains(req, res, next, seeds, options) {}

  // Validate email matches a specific regex pattern
  validateEmail(req, res, next) {
    if (!req.body[this.property]) {
      res.json("No email found in request body.");
      return;
    }
    /([\w-_\.]+)\@\1\.\1/i.match(req.body[this.property])
      ? next()
      : res.json("Invalid email provided.");
  }

  // Remove characters from input
  // User will specify req.body item in object parameter
  blacklist(req, res, next, items) {
    // Check that user-provided input is of either array or string type
    if (
      (typeof items !== Array && typeof items !== String) ||
      items.length === 0
    ) {
      res.json("Error processing input.");
      return;
    }
    // if string type, split into array and assign to input variable
    const input = typeof items === String ? items.split("") : items;
    input.map((i) => req.body[this.property].replace(i, ""));
    next();
  }

  trim(req, res, next) {
    req.body[this.property].trim();
    next();
  }
}

module.exports = { Validator };
