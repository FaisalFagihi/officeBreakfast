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
    measurementId: "G-LVE0Z9PM03"
}
 firebase.initializeApp(firebaseConfig)
 const messaging = firebase.messaging();

//  messaging.onBackgroundMessage((payload) => {
//     // Customize notification here
//     const notificationTitle = 'Background Message Title';
//     const notificationOptions = {
//       body: 'Background Message body.',
//       icon: '/firebase-logo.png'
//     };
  
//     self.registration.showNotification(notificationTitle, notificationOptions);
//   });