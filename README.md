# Welcome to the Engine API Billing Module

## Install

1. Install latest Node.js
1. Install latest MongoDB
1. Ensure Mongo is running: `$ mongo` (Ctrl+C to quit)
1. Install grunt comand line app `$ sudo npm install -g grunt-cli`

## Run

1. `$ npm install`
1. `$ grunt`
1. `$ node server`
1. Access `http://localhost:3000`

## Developing App (front end)

1. Start Billing (see **Run**)
1. Start watch command `$ grunt watch` (required to be running continually during front end development)
1. `app` folder is compiled to `dist`, which is also the web server root.  Accessing `http://localhost:3000` reaches `dist/index.html`.
1. Install [LiveReload Chrome extension](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en) to take advatage of automatic brower refreshing while editing .html and .less files (optional)
1. Before committing any front end code, run `$ grunt jshint` and solve Javascript syntax issues, then `$ grunt jscs` and solve any style issues.

**IMPORTANT**: `dist` and `temp` are transient folders and will be erased.

## Sublime Text 3 Setup

### While-you-type Javascript linting

1. Install JSHint command line app `$ sudo npm install -g jshint`
1. Install JSCS command line app `$sudo npm install -g jscs`
1. Install Sublime Package Control
   * Within Sublime Text, follow instructions here: https://sublime.wbond.net/installation
1. Install SublimeLinter
   * Within Sublime Text, pres Ctrl+Shift+P (PC) Cmd+Shift+P (Mac) and type/select "Package Control: Install Package"
   * Type/select "SublimeLinter"
   * Type/select "SublineLinter-JSHint"
   * Type/select "SublimeLinter-JSCS"

## UI Toolkit Development

1. Start development mode (see **Developing App**)
1. Open `http://localhost:3000/assets/vendor/engineui/`
1. Edit `engineui/index.html` with Bootstrap-compatible code (copy-paste from getbootstrap.com, for example)
1. Edit appropriate less files in `engineui/less` to override Bootstrap styles
1. Guideline: add custom classes if necessary, but attempt to stay as close to the Bootstrap class names as possible

## REST API Usage

Get all bills:
curl -i -X GET http://localhost:3000/bill

Get bill with _id value of 5069b47aa892630aae000007 (use a value that exists in your database):
curl -i -X GET http://localhost:3000/bills/5069b47aa892630aae000007

Delete bill with _id value of 5069b47aa892630aae000007:
curl -i -X DELETE http://localhost:3000/bills/5069b47aa892630aae000007

Add a new bill:
curl -i -X POST -H 'Content-Type: application/json' -d '{"name": "New Bill", "currency": "BTC"}' http://localhost:3000/bills

Modify bill with _id value of 5069b47aa892630aae000007:
curl -i -X PUT -H 'Content-Type: application/json' -d '{"name": "New Bill", "currency": "BTC"}' http://localhost:3000/bills/5069b47aa892630aae000007
