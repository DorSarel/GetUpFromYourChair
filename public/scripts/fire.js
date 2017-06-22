/*
fire.js - will handle the button click in order to trigger an interval timer.
From the moment the button was pressed until the next press, every 2 hours the app
will notify using javaScript notification to the user that it is time to get up.
#Optional - array of messages to the user - each notification will have different msg.
*/

//Button var
const $btn = $("#fire");
const timeForInterval = 1000 * (120 * 60); // 1000 miliseconds = 1 second * 120 minutes
const timerForDelay = 1000 * (5 * 60);
// const $timer = $("#timer");
let intervalId;

// Handle notification
if (Notification.permission !== "granted"){
	Notification.requestPermission();
}

function delay_5() {
	var delay_notification = new Notification("Come on!", {
		body: "Did you get up already?!?!?!"
	});
}

function notifyMe() {

	if (!Notification) {
		alert("Desktop notification are not availsble in your browser. Try Chrome.");
		return;
	}

	if (Notification.permission !== "granted") {
		Notification.requestPermission();
		// console.log(Notification.permission);
	} else {
		var notification = new Notification("Get Up!", {
			body: "Hey! its time to get up!\nClick the notification to activate second notification in 5 minutes."
		});

		console.log(Date.now());

		notification.onclick = () => {
			notification.close();
			// setTimeout(delay_5, 10 * 1000); //For debug
			setTimeout(delay_5, timerForDelay);
		}
	}
}

$btn.on("click", () => {
	let btnText = $btn.text();

	if (btnText.indexOf("Trigger") !== -1) {
		$btn.text("Stop Notification");
		// intervalId = setInterval(notifyMe, 30 * 1000); //For debug
		intervalId = setInterval(notifyMe, timeForInterval);
	} else {
		$btn.text("Trigger Your Next Break");
		clearInterval(intervalId);
	}
});