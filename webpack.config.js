/**
 * Created by YikaJ on 15/6/16.
 */
'use strict';

module.exports = {
    entry: [
        "./src/entry.js"
    ],
    output: {
        path: './out',
        publicPath: './out/',
        filename: "bundle.js"
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            { test: /\.(js|jsx)$/, loader: "jsx!babel", exclude: /node_modules/}
        ]
    }
};
