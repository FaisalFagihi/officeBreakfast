import React, { Component } from "react";

class SimpleNotification extends Component {
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

  showNotification() {
    new Notification('Hey')
  }

  render() {
    return (
      <div>
        <button onClick={this.showNotification}>
          Click to show notification
        </button>
      </div>
    );
  }
}

export default SimpleNotification;