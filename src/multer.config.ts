// multer-config.ts
import * as multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Request } from 'express';
import * as multer from 'multer';

const s3Config = new S3Client({
  region: 'us-east-2',
  credentials: {
    accessKeyId: 'yourAccessKeyId',
    secretAccessKey: 'yourSecretAccessKey',
  },
});

const multerConfig = {
  storage: multerS3({
    s3: s3Config,
    bucket: 'mybucketamazongtv',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file, cb) => {
      const fileName =
        path.parse(file.originalname).name.replace(/\s/g, '') + '-' + uuidv4();

      const extension = path.parse(file.originalname).ext;
      cb(null, `${fileName}${extension}`);
    },
  }),
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    callback: multer.FileFilterCallback,
  ) => {
    if (!file.mimetype.match(/^image\/(jpg|jpeg|png|gif)$/)) {
      return callback(null, false);
    }
    callback(null, true);
  },
};

export default multerConfig;
