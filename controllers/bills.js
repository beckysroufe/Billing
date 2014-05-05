var mongo = require('mongodb');
 
var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;
 
var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('billdb', server, { fsync: true, journal: true, w: 2});
 
db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'billdb' database");
        db.collection('bills', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'bills' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});
 
exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving bill: ' + id);
    db.collection('bills', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};
 
exports.findAll = function(req, res) {
    db.collection('bills', function(err, collection) {
        collection.find().toArray(function(err, items) { console.log(err, items)
            res.send(items);
        });
    });
};
 
exports.addBill = function(req, res) {
    var bill = req.body;
    console.log('Adding bill: ' + JSON.stringify(bill));
    db.collection('bills', function(err, collection) {
        collection.insert(bill, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}
 
exports.updateBill = function(req, res) {
    var id = req.params.id;
    var bill = req.body;
    console.log('Updating bill: ' + id);
    console.log(JSON.stringify(bill));
    db.collection('bills', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, bill, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating bill: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(bill);
            }
        });
    });
}
 
exports.deleteBill = function(req, res) {
    var id = req.params.id;
    console.log('Deleting bill: ' + id);
    db.collection('bills', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}
 
var populateDB = function() {
 
    var bills = [
    {
        name: "Bill 1",
        amount: "23.00",
        currency: "USD",
        description: "Bought something...",
    },
    {
        name: "Bill 2",
        amount: "44.00",
        currency: "BTC",
        description: "Bought something else...",
    }];
 
    db.collection('bills', function(err, collection) {
        collection.insert(bills, {safe:true}, function(err, result) {});
    });
 
};
