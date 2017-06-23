/*
fire.js - will handle the button click in order to trigger an interval timer.
From the moment the button was pressed until the next press, every 2 hours the app
will notify using javaScript notification to the user that it is time to get up.
#Optional - array of messages to the user - each notification will have different msg.
*/

//Button var
const $btn = $("#fire");
const $userTime = $("#user_time");

const timerForDelay = 1000 * (5 * 60);
// const $timer = $("#timer");
let timeForInterval = 1000 * (120 * 60); // 1000 miliseconds = 1 second * 120 minutes
let intervalId;

// Handle notification
if (Notification.permission !== "granted"){
	Notification.requestPermission();
}

function delay_5() {
	var delay_notification = new Notification("Come on!", {
		body: "Did you get up already?!?!?!",
		icon: "/img/Icons8-Ios7-Sports-Walking.ico"
	});

	delay_notification.onclick = () => {
		delay_notification.close();
	}
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
			body: "Hey! its time to get up!\nClick the notification to activate second notification in 5 minutes.",
			icon: "/img/Icons8-Ios7-Sports-Walking.ico"
		});

		// console.log(Date.now());

		notification.onclick = () => {
			notification.close();
			// setTimeout(delay_5, 10 * 1000); //For debug
			setTimeout(delay_5, timerForDelay);
		}
	}
}

$btn.on("click", () => {
	let btnText = $btn.text();
	let userVal = $userTime.val();

	if (btnText.indexOf("Trigger") !== -1) {

		if (userVal !== "") {
			// console.log(userVal);
			userVal = Number(userVal);
			// console.log(userVal);

			// Uses the user input to calculate the time
			timeForInterval = 1000 * (userVal * 60);

			// Sets the user input to be empty
			$userTime.val("");
		}

		$btn.text("Stop Notification");
		// intervalId = setInterval(notifyMe, 30 * 1000); //For debug
		intervalId = setInterval(notifyMe, timeForInterval);
	} else {
		$btn.text("Trigger Your Next Break");
		clearInterval(intervalId);
	}
});