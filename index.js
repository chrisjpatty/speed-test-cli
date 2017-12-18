const admin = require('firebase-admin')
const key = require('./admin-key.json')
const speedTest = require('speedtest-net')

admin.initializeApp({
  credential: admin.credential.cert(key),
  databaseURL: "https://book-club-manager-20a39.firebaseio.com"
});

const db = admin.database()
const ref = db.ref('home-speed-test')

const testSpeed = () => {
  speedTest({maxTime: 5000}).on('data', ({speeds: {download, upload}, server: {ping}}) => {
    const time = Date.now()
    const timeRef = ref.child(time)
    timeRef.set({
      d: download,
      u: upload,
      p: ping,
      t: time
    })
    console.log(download)
  })
}

testSpeed()
setInterval(testSpeed, 300000)
