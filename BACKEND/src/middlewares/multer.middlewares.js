import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/shopPhotos");
  },
  filename: function (req, file, cb) {
    const fn =
      Date.now() +
      "-" +
      Math.round(Math.random() * 10) +
      path.extname(file.originalname);
    cb(null, fn);
  },
});

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 16 * 1024 * 1024, // 16 MB
  },
});
