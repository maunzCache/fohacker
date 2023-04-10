'use strict';

import path from 'path';

const config = {
    entry: './src/fohacker.js',
    mode: 'development',
    output: {
        filename: 'bundle.js',
        path: path.resolve(path.dirname('webpack.config.js'), 'dist'),
    },
};

export default config;
