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
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              additionalData: `
                @import "./src/assets/style/mixins.scss";
              `
            }
          }
        ]
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
    })
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
