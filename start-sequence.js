document.addEventListener("DOMContentLoad", function() {
	// START SEQUENCE
	setTimeout(function() {
		playback.seek(0);
		playback.pause();

		// Hide the video
		document.getElementById("video-container").style.display = "none";

		// Display the website layer
		display.getLayer("website").setActive(true);

		// Default HUD glitch is not null
		var hudGlitch = display.getLayer("hudGlitch");
		hudGlitch.setParam("quantity", 1);
		hudGlitch.setParam("probability", 2);
		hudGlitch.setParam("width", 5);
		hudGlitch.setParam("height", 5);

		setTimeout(function() {
			// Default HUD glitch is not null
			var hudGlitch = display.getLayer("hudGlitch");
			hudGlitch.setParam("quantity", 5);
			hudGlitch.setParam("probability", 10);
			hudGlitch.setParam("width", 5);
			hudGlitch.setParam("height", 5);
		}, 1000);
		/*
		alertMessage.setActive(true);
		alertMessage.setMessage("SIGNAL PARASITE RECU");
		alertMessage.setColor("#6AFF0B");
		alertMessage.setTop(5);
		alertMessage.setBlinkSpeed(500);

		startMenu.setActive(true);
		startMenu.addButton("DECODER", function() {
			playback.play();

			startMenu.setActive(false);
			alertMessage.setActive(false);

			fullscreen.on();
		});
		*/
	}, 500);
});