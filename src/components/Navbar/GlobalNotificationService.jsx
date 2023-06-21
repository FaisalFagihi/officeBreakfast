import React, { Component } from "react";
class GlobalNotificationService extends Component {
  constructor() {
    super();
    this.showNotification = this.showNotification.bind(this);
  }

  componentDidMount() {
    if (!("Notification" in window)) {
      console.log("This browser does not support desktop notification");
    } else {
      Notification.requestPermission();
    }


  }

  showNotification(text) {
    new Notification(text, {
      body: 'My Notification Message',
      icon:"https://lh3.googleusercontent.com/u/0/drive-viewer/AFGJ81oBe4w5efa7Omi3PdQR74_Q2LfSf8po9SrGE5FMstI4wIcbeBupKtYw3TMlQiMxF42p1ULGK3hxh5g6Yo7YLccrJ6wlRw=w1278-h1279",

    })
  }


}

export default new GlobalNotificationService();