const multer = require('multer');
const path = require('path');

const Upload = multer({
  storage: multer.diskStorage({
    destination(req, file, result) {
      result(null, 'uploads') // 저장할 폴더 경로
    },
    filename(req, file, result) {
      const ext = path.extname(file.originalname); // 확장자명 추출
      const basename = path.basename(file.originalname); // 확장자 제외 파일명
      result(null, basename + new Date().valueOf() + ext); // 파일명 중복 방지
    },
  }),
  limits: {
    fileSize: 10 * 1024 * 1024 // 10mb로 파일 크기 제한
  },
});

const upload = (req, res, next) => {
  Upload.single('portrait');
  return next();
}

module.exports = upload;