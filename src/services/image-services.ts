import multer from 'multer'
import { Request, Response } from 'express'
import errorHelper from '../utils/errorHelper.js'

const storage = multer.diskStorage({
  destination: function (req: Request, file: any, cb: any) {
    cb(null, './src/assets/images')
  },
  filename: function (req: Request, file: any, cb: any) {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  }
})

const imageFilter = (req: Request, file: any, cb: any) => {
  console.log(file)
  // accept image only
  if (!file || !file.originalname || !file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error('Only image files are allowed!'), false)
  }
  cb(null, true)
}

const upload = multer({ storage, fileFilter: imageFilter }).single(
  'image'
)

const uploadImage = async (req: Request, res: Response) => {
  upload(req, res, (err) => {
    if (err) {
      console.error(err);
      if (err.code === 'LIMIT_FILE_SIZE') {
        errorHelper.badRequestError('Image file too large');
      } else {
        errorHelper.internalServerError('Failed to upload image');
      }
    }
    console.log('Uploading image');
    console.log(req.file);
    try {
      if (!req.file || req.file === undefined) {
        errorHelper.badRequestError('No image file uploaded');
      }
      return res.status(200).json({
        message: 'Image uploaded successfully',
        filename: req.file?.filename,
        filepath: req.file?.path,
      });
    } catch (err) {
      console.error(err);
      errorHelper.internalServerError('Failed to upload image');
    }
  });
}

export default {
  uploadImage
}
