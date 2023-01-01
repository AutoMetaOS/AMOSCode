const MiniCssExtractPlugin = require( "mini-css-extract-plugin" );
const MonacoWebpackPlugin = require( "monaco-editor-webpack-plugin" );
const { resolve } = require( "path" );


module.exports = ( env ) => {
  const { NODE_ENV = "development" } = env;
  const prod = NODE_ENV === "production";

  console.warn( prod ? "Starting Production Build" : "Starting Dev Run" )
  return {
    devServer: {
      hot: true,
      static: resolve( __dirname, 'public' ),
      port: 3000,
      historyApiFallback: true,
    },
    entry: { bundle: [ "./src/main.js" ] },
    stats: "minimal",
    resolve: {
      alias: { svelte: resolve( "node_modules", "svelte" ) },
      extensions: [ ".mjs", ".js", ".svelte" ],
      mainFields: [ "svelte", "browser", "module", "main" ],
    },
    output: {
      path: __dirname + "/public",
      filename: "[name].js",
      chunkFilename: "[name].[id].js",
    },
    module: {
      rules: [
        {
          test: /\.svelte$/,
          use: {
            loader: "svelte-loader",
            options: {
              emitCss: true,
              hotReload: true
            },
          },
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
          ],
        },
        {
          test: /\.ttf$/,
          use: [ "file-loader" ],
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [ { loader: "file-loader" } ],
        },
      ],
    },
    mode: NODE_ENV,
    plugins: [
      new MonacoWebpackPlugin(),
      new MiniCssExtractPlugin( {
        filename: prod ? "[name].css" : "[name].[contenthash].css",
        chunkFilename: prod ? "[id].css" : "[id].[contenthash].css",
      } ),
    ],
    devtool: prod ? false : "source-map",
  }
};
