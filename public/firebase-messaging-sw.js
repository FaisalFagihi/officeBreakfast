importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object

const firebaseConfig = {
    apiKey: "AIzaSyCxX9DZbrzNCrm6erQS3oumCWwEwbTIUig",
    authDomain: "office-breakfast.firebaseapp.com",
    projectId: "office-breakfast",
    storageBucket: "office-breakfast.appspot.com",
    messagingSenderId: "400832963899",
    appId: "1:400832963899:web:ccf4ee10ead891dacd431e",
    measurementId: "G-LVE0Z9PM03",
}

 firebase.initializeApp(firebaseConfig)
 const messaging = firebase.messaging();

//  messaging.onMessage((payload) => {
//     return
//   //  self.registration.showNotification(payload?.notification?.title,
//   //   {
//   //     body: payload?.notification?.body,
//   //     icon:"../dist/assets/windows11/Square44x44Logo.scale-200.png"
//   //   })
//     const notificationTitle = payload?.notification?.title;
//     const notificationOptions = {
//       body: payload?.notification?.body,
//       icon:"/assets/logo-96.png",
//     };
//     self.registration.showNotification(notificationTitle, notificationOptions);
// });

// self.addEventListener("notificationclick", (event) => {
//   console.log("On notification click: ", event.notification.tag);
//   event.notification.close();

//   // This looks to see if the current is already open and
//   // focuses if it is
//   event.waitUntil(
//     clients
//       .matchAll({
//         type: "window",
//       })
//       .then((clientList) => {
//         for (const client of clientList) {
//           if (client.url === "/" && "focus" in client) return client.focus();
//         }
//         if (clients.openWindow) return clients.openWindow("/");
//       })
//   );
// });


 messaging.onBackgroundMessage((payload) => {
    // Customize notification here
    const notificationTitle = payload?.data?.title;
    const notificationOptions = {
      body: payload?.data?.body,
      icon:"/assets/logo-96.png",
    };

    console.log(payload)
  
    self.registration.showNotification(notificationTitle, notificationOptions);
  })