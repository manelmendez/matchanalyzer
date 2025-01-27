import multer from 'multer'
import { Request, Response } from 'express'

const storage = multer.diskStorage({
  destination: function (cb: any) {
    cb(null, './assets/images')
  },
  filename: function (file: any, cb: any) {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  }
})

const imageFilter = (file: any, cb: any) => {
  // accept image only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error('Only image files are allowed!'), false)
  }
  cb(null, true)
}

const upload = multer({ storage, fileFilter: imageFilter }).single(
  'image'
)

const uploadImage = async (req: Request, res: Response) => {
  console.log('Uploading image')
  console.log(req.body)
  try {
    upload(req, res, (err) => {
      if (err) {
        console.error(err);
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(413).json({ error: 'Image file too large' });
        } else {
          return res.status(500).json({ error: 'Failed to upload image' });
        }
      }
      if (!req.file) {
        return res.status(400).json({ error: 'No image file uploaded' });
      }
      return res.status(200).json({
        message: 'Image uploaded successfully',
        filename: req.file.filename,
        filepath: req.file.path,
      });
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export default {
  uploadImage
}
