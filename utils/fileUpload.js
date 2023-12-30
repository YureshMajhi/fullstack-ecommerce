const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // destination for file
    const filePath = "public/uploads";
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath, { recursive: true });
    }

    cb(null, filePath);
  },
  filename: function (req, file, cb) {
    // samsung.jpg
    const ext = path.extname(file.originalname); // .jpg
    let fileName = path.basename(file.originalname); // samsung

    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

    fileName += uniqueSuffix + ext;
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    !file.originalname.match(
      /[.](jpg|JPG|png|PNG|svg|SVG|jpeg|JPEG|gif|GIF|webp)$/
    )
  ) {
    return cb(new Error("Invalid image file format"), false);
  }

  cb(null, true);
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limit: {
    fileSize: 2000000,
  },
});

module.exports = upload;
