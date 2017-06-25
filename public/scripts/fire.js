/*
fire.js - will handle the button click in order to trigger an interval timer.
From the moment the button was pressed until the next press, every 2 hours the app
will notify using javaScript notification to the user that it is time to get up.
#Optional - array of messages to the user - each notification will have different msg.
*/

//Button var
const $btn = $("#fire");
const $userTime = $("#user_time");
const $bContainer = $(".container-body");
const $timer = $("<div id='timer'</div>");

const timerForDelay = 1000 * (5 * 60);
let timeForInterval = 1000 * (120 * 60); // 1000 miliseconds = 1 second * 120 minutes
let intervalId;

// Handle notification
if (Notification.permission !== "granted"){
	Notification.requestPermission();
}


/*
delay_5
Responsible for creating second notification,
5 minutes after the first one in order to remind the user to get up in case he didn't.
*/
function delay_5() {
	var delay_notification = new Notification("Come on!", {
		body: "Did you get up already?!?!?!",
		icon: "/img/Icons8-Ios7-Sports-Walking.ico"
	});

	delay_notification.onclick = () => {
		delay_notification.close();
	}
}

/*
notifyMe
Responsible for creating the first notification.
User input decide when the notification will happen, if not user - default it 2 hours.
*/
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

		startCountDown();
		notification.onclick = () => {
			notification.close();
			// setTimeout(delay_5, 10 * 1000); //For debug
			setTimeout(delay_5, timerForDelay);
		}
	}
}

/*
startCountDown
Responsilbe for setting countdown between notifications.
on countdown finish - notifyMe will trigger.
*/
function startCountDown() {

	removeElem();
	// Create the time element and append it to the container
	$bContainer.append($timer);

	//Setting the timer for the next break
	$timer.countdown(Date.now() + timeForInterval, (e) => {
		$timer.html(e.strftime("%H:%M:%S"));
	});

	$timer.on("finish.countdown", notifyMe);
}


/*
removeElem
Responsilbe for removing the $timer element.
*/
function removeElem() {
	// Remove the timer element from the container
	$timer.remove();
}



/*
The button handler.
Responsible for handling the click event.
User input will be handled when button is clicked.
*/
$btn.on("click", () => {
	let btnText = $btn.text();
	let userVal = $userTime.val();

	if (btnText.indexOf("Trigger") !== -1) {

		if (userVal !== "") {
			// console.log(userVal);
			userVal = Number(userVal);

			if (userVal > 180 || userVal < 1) {
				userVal = 180;
			}
			// console.log(userVal);

			// Uses the user input to calculate the time
			timeForInterval = 1000 * (userVal * 60);
			// Sets the user input to be empty
			$userTime.val("");
		}

		$btn.text("Stop Notification");
		startCountDown();

	} else {
		$btn.text("Trigger Your Next Break");
		$timer.countdown("stop");
		$timer.html("");

		removeElem();
	}
});