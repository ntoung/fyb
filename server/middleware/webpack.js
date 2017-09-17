import path from 'path';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../../webpack.config';
import webpackHotConfig from '../../webpack.dev_hot.config';
// import webpackDevHot from '../../webpack.dev_hot.config';
import { ENV, DIST, HOT } from '../config/config';

export default (app) => {
  if (ENV === 'development') {
    const compiler = webpack((HOT) ? webpackHotConfig : webpackConfig);
    const middleware = webpackMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
      contentBase: path.join(DIST),
      hot: true,
      quiet: false,
      noInfo: true,
      lazy: false,
      stats: {
        colors: true,
        hash: false,
        timings: true,
        modules: false,
      },
    });

    app.use(middleware);
    app.use(webpackHotMiddleware(compiler));
    app.get('*', (req, res) => {
      console.log(path.join(DIST, 'index.html'));
      res.write(middleware.fileSystem.readFileSync(path.join(DIST, 'index.html')));
      res.end();
    });
    // return;
  }

  if (ENV === 'production') {
    app.get('*', (req, res) => {
      res.sendFile(path.join(DIST, 'index.html'));
    });
    // return;
  }
};
