import multer from 'multer';
import { Request } from 'express';
import { AppError } from './error.middleware';

// Store files in memory so Vision AI and Pinecone can directly read buffers
const storage = multer.memoryStorage();
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB limit

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (file.mimetype.startsWith('image/')) {
    return cb(null, true);
  }

  cb(new AppError('Only image files (JPEG, PNG, WEBP) are allowed!', 400));
};

export const upload = multer({
  storage,
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
  fileFilter,
});

export default upload;
