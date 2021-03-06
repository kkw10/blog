const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  mode: 'production',
  // [번들링 시작점]
  entry: [
    './src/index.js',
  ],
  // [번들링 결과물 처리]
  output: {
    path: path.resolve(__dirname, 'dist'), // 번들링 결과물로 나올 파일이 저장될 경로 지정. (이 경우 dist 폴더에 저장함.)
    filename: 'bundle.js', // 빌드된 파일의 이름을 설정.
    publicPath: '/', // 파일들이 위치할 서버 상의 경로( express.static 경로와 비슷 ).
  },
  // [번들링 진행 규칙 설정]
  module: {
    rules: [
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: {
          loader: 'html-loader',
        },
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg)$/,
        use: ['file-loader'],
      },
    ],
  },
  // [번들 과정에 적용할 플러그인 설정]
  plugins: [
    new HtmlWebpackPlugin({ // dist 폴더에 html파일을 자동으로 생성함.
      template: './public/index.html',
      filename: 'index.html',
    }),
    new CleanWebpackPlugin(), // 빌드할 때 기존 dist 폴더 정리.
    new CompressionPlugin(), // 번들 파일에 gzip 적용.
  ],
};
