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
    })
  }


}

export default new GlobalNotificationService();