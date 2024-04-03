import multer from 'multer'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './assets/images')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const imageFilter = (req, file, cb) => {
  // accept image only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error('Only image files are allowed!'), false)
  }
  cb(null, true)
}

const upload = multer({ storage, fileFilter: imageFilter }).single(
  'image'
)

const uploadImage = async (req, res) => {
  console.log('Uploading image')
  console.log(req.body)
  try {
    await upload(req, res, function (err) {
      if (err) {
        console.log(err)
        return res.status(500).send('Fail!')
      } else {
        return res.status(200).send(req.file.path)
      }
    })
  } catch (err) {
    res.status(500).send({
      error: 'Something went wrong uploading image'
    })
  }
}

export default {
  uploadImage
}
