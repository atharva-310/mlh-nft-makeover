This app is MLH: Hack the Runway Submission

## Follow the step to run application on your local system
- Clone this Repository
- Run command `npm install`
- After completion  find the file name `./node_modules/react-scripts/config/webpack.config.js`
- Add the Following code to the `resolve` object 
```fallback: { "crypto": require.resolve("crypto-browserify"),"stream": require.resolve("stream-browserify")}```
- Run command `npm start`


## Demo Video - https://youtu.be/0NBjY7kREZ4
