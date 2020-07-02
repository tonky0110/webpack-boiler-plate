webpack 빌드 정리


I. webpack개발환경 구성.
1. yarn init
  - 프로젝트 생성.

2. webpack, webpack-cli 설치
    yarn add -D webpack webpack-cli

3. babel 설치
    yarn add -D @babel/cli
    yarn add -D @babel/core
    yarn add -D @babel/plugin-proposal-class-properties
    yarn add -D @babel/preset-env

4. babel-loader 설치
    yarn add -D babel-loader

5. build 스크립트 추가.
    "scripts": {
        "build": "webpack -w"
    }

6. webpack config 파일 생성
    file name: webpack.config.js


II. ES6 개발환경 설정.
7. @babel/polyfill 설치.
    yarn add @babel/polyfill
    ※ babel-polyfill은 개발 환경에서만 사용하는 것이 아니라 실제 환경에서도 사용하여야 하므로 --save-dev 옵션으로 개발 설치를 하지 않도록 한다.

8. webpack.config.js 파일 수정
    build에 '@babel/polyfill'배열 맨앞에 추가.


III. SASS 환경 설정.
9. node-sass style-loader css-loader sass-loader 설치.
yarn add -D node-sass
yarn add -D style-loader
yarn add -D css-loader
yarn add -D sass-loader

10. 진입점 수정 및 모듈 추가
 entry: [..., './src/sass/main.scss'],
      {
        test: /\.scss$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader",   // translates CSS into CommonJS
          "sass-loader"   // compiles Sass to CSS, using Node Sass by default
        ],
        exclude: /node_modules/
      }

10.1. scss 테스트
    ./src/sass/main.scss
    @import "partials/vars";
        // src/sass/partials/_vars.scss
        $font_color: #333;
        $font_family: Arial, sans-serif;
        $font_size: 16px;
        $line_height: percentage(20px / $font_size);
    @import "partials/body";
        body {
            color: $font_color;
        
            // Property Nesting
            font: {
            size: $font_size;
            family: $font_family;
            }
        
            line-height: $line_height;
        }
    --> exports.push([module.i, "body {\n  color: #333;\n  font-size: 16px;\n  font-family: Arial, sans-serif;\n  line-height: 125%; }\n", ""]);과 같이 inner style로 'bundle.js'에 추가되어 있음.


# styles.css로 분리
11. mini-css-extract-plugin 설치.
yarn add -D mini-css-extract-plugin

12. webpack.config.js 추가.
    const MiniCssExtractPlugin = require('mini-css-extract-plugin');
    ...
    plugins: [
        // 컴파일 + 번들링 CSS 파일이 저장될 경로와 이름 지정
        new MiniCssExtractPlugin({ filename: 'css/style.css' })
    ],
    ...
    MiniCssExtractPlugin.loader,

12.1 index.html에서 css 추가.
    <link href="./dist/css/style.css" rel="stylesheet"></link>