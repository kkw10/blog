const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
const path = require('path');

// AWS에 접근할 수 있도록 설정
AWS.config.update({
  region: 'ap-northeast-2', // 서울 리전
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
});

const upload = multer({
  storage: multerS3({
    // destination(req, file, result) {
    //   result(null, 'uploads') // 저장할 폴더 경로
    // },
    // filename(req, file, result) {
    //   const ext = path.extname(file.originalname); // 확장자명 추출
    //   const basename = path.basename(file.originalname, ext); // 확장자 제외 파일명
    //   result(null, basename + new Date().valueOf() + ext); // 파일명 중복 방지
    // },
    s3: new AWS.S3(),
    bucket: 'react-spacer',
    key(req, file, cb) {
      cb(null, `original/${+new Date()}${path.basename(file.originalname)}`);
    },
  }),
  limits: {
    fileSize: 10 * 1024 * 1024 // 10mb로 파일 크기 제한
  },
});

module.exports = upload;