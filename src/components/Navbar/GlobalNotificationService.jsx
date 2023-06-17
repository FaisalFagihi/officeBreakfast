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
    console.log("Global", text)
    new Notification(text)
  }


}

export default new GlobalNotificationService();