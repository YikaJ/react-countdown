module.exports = {
    devtool: 'source-map',
    entry: [
        "./entry.js"
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
            { test: /\.(js|jsx)$/, loader: "babel", exclude: /node_modules/}
        ]
    }
};
