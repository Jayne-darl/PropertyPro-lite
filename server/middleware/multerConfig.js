import multer from 'multer';
import Datauri from 'datauri';

import path from 'path';
import { uploader } from '../config/cloudinaryConfig';

const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).single('image_url');
const dUri = new Datauri();

/**
* @description This function converts the buffer to data url
* @param {Object} req containing the field object
* @returns {String} The data url from the string buffer
*/
const dataUri = req => dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);

const imageUpload = (req) => {
  const file = dataUri(req).content;
  return uploader.upload(file)
    .then(result => result.url)
    .catch(err => err);
};

export { multerUploads, imageUpload };
