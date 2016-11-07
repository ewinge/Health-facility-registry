# How to run this stuff

Install NodeJS
https://nodejs.org/en/download/current/

Install the dependencies
```bash
npm install
```

Start the dev server that uses webpack (see details in the webpack.config.js)
```
npm start
```

Open the webserver in either Chrome or Firefox and point to
> http://localhost:8081

For this to work properly you'll need a local version of DHIS2 or point the navigate to the demo or dev servers (https://play.dhis2.org/demo or https://play.dhis2.org/dev)
If you want to run it against either of these you will need to set up the server to accept CORS requests from http://localhost:8081
You can do this by adding `http://localhost:8081` to the CORS Whitelist in the System Settings App.

- Open dhis2
- Go to System Settings (from the menu)
- Click the access tab
- Add `http://localhost:8081` to the CORS Whitelist
