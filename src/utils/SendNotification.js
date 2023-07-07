const admin = require("firebase-admin");
const serviceAccount = require("../../wassallni-firebase-adminsdk-drj6g-a22505abb2.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});


  function sendPushNotification  (fcmToken,data) {
    const message = {
      data: data,
      token: fcmToken,
    };
  
    admin
      .messaging()
      .send(message)
      .then((response) => {
        console.log("Notification sent successfully:", response);

      })
      .catch((error) => {
        console.log( error);
      });
  };
  module.exports=sendPushNotification



