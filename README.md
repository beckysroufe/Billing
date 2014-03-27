# Welcome to the Engine API Billing Module

## Install

1. <Install latest Node.js>
1. <Install latest MongoDB>
1. Ensure Mongo is running: `$ mongo` (Ctrl+C to quit)
1. `$ sudo npm install -g grunt-cli`
1. `$ sudo npm install -g bower`

## Run

1. `$ npm install`
1. `$ grunt`
1. `$ node server.js`
1. Access http://localhost:3000

## Develop

1. First, run successfully (above)
1. `$ grunt watch`
1. Edit folders img, less, or src and changes will appear in '_public'
1. Install [LiveReload Chrome extension](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en) to take advatage of automatic brower refreshing when editing .html and .less files.

**IMPORTANT**: '_public' is a transient output folder.  Do not edit any files here, since changes will be erased.

## Code Convention

Front end Javascript is adhering the [jQuery Style Guide](https://contribute.jquery.org/style-guide/js/) to include linting by JSHint (grunt jshint).

Spacing and max-line-width of 100 characters are important.  The only exception to jQuery's guide is that we are using single quotes, not double quotes.

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
