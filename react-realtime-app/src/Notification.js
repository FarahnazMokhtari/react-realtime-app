// Notification.js
import React from "react";

const Notification = ({ notifications }) => {
  return (
    <ul>
      {notifications.map((notification, index) => (
        <li key={index}>{notification.message}</li>
      ))}
    </ul>
  );
};

export default Notification;
