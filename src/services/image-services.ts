import multer from 'multer'
import { Request, Response } from 'express'
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req: Request, file: any, cb: any) {
    const __dirname = path.resolve()
    const uploadPath = path.join(__dirname, 'src', 'assets', 'images'); // Construye la ruta absoluta
    cb(null, uploadPath);
  },
  filename: function (req: Request, file: any, cb: any) {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  }
})

const imageFilter = (req: Request, file: any, cb: any) => {
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
        return res.status(413).json({ error: 'Image file too large' });
      } else {
        return res.status(500).json({ error: 'Failed to upload image' });
      }
    }
    console.log('Uploading image');
    console.log(req.file);
    try {
      if (!req.file || req.file === undefined) {
        return res.status(400).json({ error: 'No image file uploaded' });
      }
      return res.status(200).json({
        message: 'Image uploaded successfully',
        filename: req.file?.filename,
        filepath: req.file?.path,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
}

export default {
  uploadImage
}
