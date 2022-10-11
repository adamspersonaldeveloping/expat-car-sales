const multer = require("multer");
const path = require("path");

module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
})
// .fields(
//   [
//     {
//       name: "exteriorFiles", maxCount: 10
//     },
//     {
//       name: "interiorFiles", maxCount: 10
//     },
//     {
//       name: "documentFiles", maxCount: 10
//     }
//   ]
// );
