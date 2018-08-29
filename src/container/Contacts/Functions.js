import * as functions from 'firebase-functions';
import * as fetch from 'node-fetch';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);

//send the push notification 
export const sendPushNotification = functions.database.ref('contacts/').onCreate(event => {

  const root = event.data.ref.root
  let messages = []

  //return the main promise 
  return root.child('/users').once('value').then(snapshot => {
    snapshot.forEach(function (childSnapshot) {
      let expoToken = childSnapshot.val().expoToken;
      messages.push({
        "to": expoToken,
        "sound": "default",
        "body": "New contact"
      });
    });
    return Promise.all(messages)

  })
    .then(messages => {
      fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messages)

      });
    })
    .catch(reason => {
      console.log(reason)
    })

});