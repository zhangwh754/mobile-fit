// eslint-disable-next-line no-unused-vars
const { Configuration, DefinePlugin } = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

/**
 * @type Configuration
 */
const config = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    filename: '[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true // webpack5集成了清理打包目录的功能
  },
  module: {
    rules: [
      {
        test: /\.((c|sa|sc)ss)$/i,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              additionalData: `
                @import "./src/assets/style/mixins.scss";
              `
            }
          }
        ]
      },
      {
        test: /\.(jpg|png|gif|bmp|jpeg)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: 'image/[name][hash:9].[ext]', // 对打包之后的图片名称进行加密
            esModule: false,
            limit: 8 * 1024 // 将小于8kb的图片用based64处理
          }
        },
        type: 'javascript/auto' //转换 json 为 js
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new DefinePlugin({
      BASE_URL: "'./'",
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false
    }),
    require('postcss-preset-env')
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
    extensions: ['.js']
  },
  stats: 'errors-warnings',
  devServer: {
    hot: true,
    open: true,
    client: {
      logging: 'warn' // 取消浏览器控制台热更新日志
    }
  }
}

module.exports = config
