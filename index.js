const admin = require('firebase-admin');
const moment = require('moment');
const key = require('./admin-key.json');
const speedTest = require('speedtest-net');

admin.initializeApp({
  credential: admin.credential.cert(key)
});

var db = admin.firestore();

const testSpeed = async () => {
  const result = await speedTest({maxTime: 5000});
  const time = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
  const data = {...result, timestamp: time};
  db.collection('test-log').doc(time).set(data).then(() => {
    console.log(result);
  })
};

testSpeed();
setInterval(testSpeed, 5 * 60 * 1000); // 5 minutes
// return;
