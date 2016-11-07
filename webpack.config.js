module.exports = {
    // The entry file of our app, where the app should start.
    entry: './src/app.js',
    output: {
        // The filename of the bundle. This file will contain all our code from all the separate files bundled into one .js file.
        filename: 'app.js'
    },

    module: {
        loaders: [
            {
                test: /.*\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
            }
        ]
    },

    // Settings for webpack-dev-server
    devServer: {
        // Run the dev server on port 8081
        port: 8081,
        // Serve the files from the src directory. So http://localhost:8081 will load index.html from the ./src directory.
        contentBase: './src',
        inline: true,
    }
};
