document.addEventListener("DOMContentLoaded", function() {
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
		hudGlitch.setActive(true);
		hudGlitch.setParam("quantity", 1);
		hudGlitch.setParam("probability", 2);
		hudGlitch.setParam("width", 5);
		hudGlitch.setParam("height", 5);

		// Get JpegGlitch Layer
		var jpegGlitch = display.getLayer("jpegGlitch");
		jpegGlitch.setActive(true);

		var noise = display.getLayer("noise");

		var generateGlitch = function() {
			var duration = 10 + Math.floor(Math.random() * 250);
			display.getLayer("jpegGlitch").addGlitch({
				amount     : Math.ceil(Math.random() * 25),
				seed       : Math.ceil(Math.random() * 25),
				iterations : Math.ceil(Math.random() * 25),
				quality    : 75
			}, duration);
		};

		setTimeout(function() {
			// Default HUD glitch is not null
			hudGlitch.setParam("quantity", 5);
			hudGlitch.setParam("probability", 25);
			hudGlitch.setParam("width", 5);
			hudGlitch.setParam("height", 5);
		}, 3000);

		setTimeout(function() {
			// Default HUD glitch is not null
			hudGlitch.setParam("quantity", 25);
			hudGlitch.setParam("probability", 25);
			hudGlitch.setParam("width", 5);
			hudGlitch.setParam("height", 5);
		}, 5000);

		setTimeout(function() {
			// Default HUD glitch is not null
			hudGlitch.setParam("quantity", 50);
			hudGlitch.setParam("probability", 50);
			hudGlitch.setParam("width", 10);
			hudGlitch.setParam("height", 10);

			noise.setActive(true);
			noise.setOpacity(0.1);

			sfx.play("noise_increase");

			generateGlitch();
		}, 7000);

		setTimeout(function() {
			generateGlitch();
			generateGlitch();

			noise.setActive(true);
			noise.setOpacity(0.2);
		}, 8000);

		setTimeout(function() {
			generateGlitch();
			generateGlitch();
			generateGlitch();

			noise.setActive(true);
			noise.setOpacity(0.3);
		}, 9000);

		setTimeout(function() {
			generateGlitch();
			generateGlitch();
			generateGlitch();
			generateGlitch();

			noise.setActive(true);
			noise.setOpacity(0.4);
		}, 10000);

		setTimeout(function() {
			// Hide the website
			display.getLayer("hudGlitch").setActive(false);
			display.getLayer("jpegGlitch").setActive(false);
			display.getLayer("website").setActive(false);

			var whiteNoise = new Howl({
				urls : ["./resource/sound/white-noise.mp3", "./resource/sound/white-noise.wav"],
				autoplay : true,
				loop : true,
				volume : 0.25
			});

			// Show the video
			document.getElementById("video-container").style.display = "block";

			// Transform the canvas to hud
			display.getCanvas().className = "hud";

			// Start menu
			var alertMessage = display.getLayer("alertMessage");
			alertMessage.setActive(true);
			alertMessage.setMessage("SIGNAL PARASITE RECU");
			alertMessage.setColor("#6AFF0B");
			alertMessage.setTop(5);
			alertMessage.setBlinkSpeed(500);

			var noise = display.getLayer("noise");
			noise.setActive(true);
			noise.setOpacity(0.25);

			var startMenu = display.getLayer("startMenu");
			startMenu.setActive(true);
			startMenu.addButton("DECODER", function() {
				playback.play();

				whiteNoise.stop();
				whiteNoise.unload();

				noise.setActive(false);
				startMenu.setActive(false);
				alertMessage.setActive(false);

				fullscreen.on();
			});
		}, 11000);
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