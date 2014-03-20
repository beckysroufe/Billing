#SETUP

1 npm install 
2 sudo mongod
3 node server.js

#USAGE

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


