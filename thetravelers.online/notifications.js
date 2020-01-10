// ==UserScript==
// @name         send notifications
// @namespace    https://pfg.pw/
// @version      0.1
// @description  send notifications in the travelers
// @author       pfg
// @match        https://thetravelers.online/
// @grant        none
// ==/UserScript==

(() => {
  let permRequestButton;

  let askForPerms = () => {
    if (permRequestButton) return;

    permRequestButton = document.createElement("button");
    permRequestButton.style.position = "fixed";
    permRequestButton.style.top = "0";
    permRequestButton.style.left = "0";
    permRequestButton.appendChild(
      document.createTextNode("activate notifications")
    );
    document.body.appendChild(permRequestButton);

    permRequestButton.addEventListener("click", () => {
      notificationSetup();
    });
  };

  let startNotifications = () => {
    if (permRequestButton) permRequestButton.remove();

    let origNew = NOTIF.new;

    NOTIF.new = (text, flashtime = 1000) => {
      if (Notification.permission !== "granted") {
        askForPerms();
      }

      let notification = new Notification("The Travelers", { body: text });
      //setTimeout(() => notification.close(), flashtime);

      origNew(text, flashtime);
    };
  };

  let notificationSetup = async () => {
    let perms = await Notification.requestPermission();
    if (perms === "denied" || perms === "default") {
      alert(
        "Notification permissions denied, cannot send notifications. Check your browser settings to reactivate notifications."
      );
      return;
    }

    startNotifications();
  };

  if (Notification.permission === "granted") startNotifications();
  else {
    askForPerms();
  }
})();
