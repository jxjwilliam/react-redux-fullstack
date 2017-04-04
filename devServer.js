import express from 'express';
import webpack from 'webpack';
import config from './webpack.config';

const app = express();

const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, error => {
    if(error) {
        console.error(error);
    } else {
        console.log('Sever start and listening on ' + port);
    }
});
