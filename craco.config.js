const CracoLessPlugin = require('craco-less');
const path = require('path');
const webpack = require('webpack');
const envParams = require('dotenv').config().parsed;
if (process.env.NODE_ENV === 'development') {
  console.log('ENV params', envParams);
}
module.exports = {
  // webpack: {
  //   alias: {
  //     enviroment: path.join(__dirname, 'src', 'environments', 'environment'),
  //   },
  //   plugin: {
  //     add: [
  //       new webpack.DefinePlugin({
  //         process: { env: {} }
  //       }),
  //       new webpack.EnvironmentPlugin({ ...envParams })
  //     ]
  //   }
  //   // [new webpack.EnvironmentPlugin({ ...envParams })],
  // },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#4cc9f0',
              '@font-size-base': '16px',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
