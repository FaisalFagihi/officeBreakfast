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

 const requestPermission = async () => {
    if (!auth.isAuthenticated())
      return
    const perimission = await Notification.requestPermission()
    if (perimission === 'granted') {
      const token = await getToken(messaging, { vapidKey: 'BAusTrWhr_PENeKaWEJnjxpZJJ1BeuEgANFHrM3e0gOM41y4JatuCsO-2TNgMKy_xSmu9RKT81OZM5moNDdtBXg' })
      if (!token)
        return
      userController.registerFcmToken(token).then((data) => {
        console.log('regisetered token')
      }).catch((err) => {
        console.log('regiseter token error:', err)
      })
    }
  }
  requestPermission()

//  messaging.onMessage((payload) => {
//   // GlobalNotificationService.showNotification(payload?.notification?.title)

//    self.registration.showNotification(payload?.notification?.title,
//     {
//       body: payload?.notification?.body,
//       icon:"../dist/assets/windows11/Square44x44Logo.scale-200.png"
//     })

// });

 messaging.onBackgroundMessage((payload) => {
    // Customize notification here
    const notificationTitle = payload?.notification?.title;
    const notificationOptions = {
      body: payload?.notification?.body,
      icon:"/assets/logo-96.png",
    };
  
    self.registration.showNotification(notificationTitle, notificationOptions);
  });