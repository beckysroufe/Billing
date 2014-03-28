var express = require('express'),
    bill = require('./controllers/bills.js');
 
var app = express();
 
app.configure(function () {
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
    app.use(express.static(__dirname+'/_public'));
});
 
app.get('/bills', bill.findAll);
app.get('/bills/:id', bill.findById);
app.post('/bills', bill.addBill);
app.put('/bills/:id', bill.updateBill);
app.delete('/bills/:id', bill.deleteBill);
 
app.listen(3000);
console.log('Listening on port 3000...');
