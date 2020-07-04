// const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './assets/images');
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname);
//   }
// });
// const upload = multer({storage: storage, fileFilter: imageFilter}).single('image');

// async function uploadImage (req, res) {
//   try {
//     await upload(req, res, function (err) {
//       if (err) {
//         return res.status(500).send('Fail!');
//       } else {
//         return res.status(200).send(req.file.path);
//       }
//     });
//   }
//   catch (err) {
//     res.status(500).send({
//       error: 'Something went wrong'
//     });
//   }
// }

// function imageFilter (req, file, cb) {
//     // accept image only
//     if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
//         return cb(new Error('Only image files are allowed!'), false);
//     }
//     cb(null, true);
// };
// module.exports = {
//   uploadImage
// };