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
1. Prefer not to use Bootstrap classes in markup.  Instead, referencing Bootstrap classes in less files using, e.g., "&:extend(.btn all, .btn-lg all);".  See http://lesscss.org/features/#import-options-reference.

## engineui UI Toolkit Development

1. Follow instructions for **Develop**
1. Open http://localhost:3000/engineui.html
1. Copy-paste example Bootstrap code from getbootstrap.com into src/engineui.html
1. Edit appropriate less files in less/engineui to override Bootstrap styles
1. Note: override Bootstrap classes, but don't change them.  Add classes if necessary, but the idea is to keep as close to the Bootstrap docs as possible.
1. Helpful hint: reference Bootstrap less files found under _public/vendor/less for guidance on what to override.  (Do not modify the Bootstrap sources, however, because changes will be lost.)

**IMPORTANT**: '_public' is a transient output folder.  Do not edit any files here, since changes will be erased.

## Code Convention

Front end Javascript is adhering to the [jQuery Style Guide](https://contribute.jquery.org/style-guide/js/) to include linting by JSHint (grunt jshint).

CSS property order: http://codeguide.co/#css-declaration-order

HTML attribute order: http://codeguide.co/#html-syntax (see Attribute Order)

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
