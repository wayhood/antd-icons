const path = require('path')
const VueLoaderPlugin = require('vue-loader/dist/plugin').default
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const babelConfig = {
  cacheDirectory: true,
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'not ie 11'],
        },
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'babel-plugin-import',
      {
        libraryName: 'ant-design-vue',
        libraryDirectory: '', // default: lib
        style: true,
      },
    ],
    ['@vue/babel-plugin-jsx', { mergeProps: false, enableObjectSlots: false }],
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-transform-object-assign',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-class-properties',
  ],
}

const ENV = process.env.NODE_ENV
const isProd = ENV === 'production'

const optimization = isProd
  ? {
      minimize: true,
      minimizer: [new CssMinimizerPlugin({}), new TerserWebpackPlugin()],
    }
  : {}

module.exports = {
  mode: isProd ? 'production' : 'development',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: './',
    filename: 'antd-icons.js',
    library: 'antdIcons',
    libraryTarget: 'umd',
    libraryExport: 'default',
    umdNamedDefine: true,
    // globalObject: `(typeof self !== 'undefined' ? self : this)`, // https://stackoverflow.com/questions/49111086/webpack-4-universal-library-target
    globalObject: "typeof self !== 'undefined' ? self : this",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        options: babelConfig,
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: [MiniCssExtractPlugin.loader],
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            // options: {
            //   // 这里可以指定一个 publicPath
            //   // 默认使用 webpackOptions.output中的publicPath
            //   publicPath: '../'
            // },
          },
          'css-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                sourceMap: true,
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
    ],
  },
  externals: {
    vue: {
      root: 'Vue',
      commonjs2: 'vue',
      commonjs: 'vue',
      amd: 'vue',
    },
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js',
    },
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      // 类似 webpackOptions.output里面的配置 可以忽略
      filename: 'antd-icons.css',
      chunkFilename: '[id].css',
    }),
  ],
  optimization: optimization,
}
