var express = require('express'),
    bill = require('./controllers/bills.js');
 
var app = express();
 
app.configure(function () {
  app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
  // app.use(function(req, res, next) {
  //   console.log('>>>before', req.url);
  //   if (!req.url.match(/.*\/.+\..+/)) {
  //     req.url = '';
  //     console.log('>>>after', req.url);
  //   }
  //   next();
  // });
  app.use(express.bodyParser());
  app.use(express.static(__dirname+'/dist'));
});
 
app.get('/bills', bill.findAll);
app.get('/bills/:id', bill.findById);
app.post('/bills', bill.addBill);
app.put('/bills/:id', bill.updateBill);
app.delete('/bills/:id', bill.deleteBill);
 
app.listen(3000);
console.log('Listening on port 3000...');
