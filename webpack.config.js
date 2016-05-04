module.exports = {
    entry: [
        "./index.js"
    ],
    output: {
        path: './lib',
        filename: "CountDown.js"
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
