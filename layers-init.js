/* Layers init */

// Globals
var playback, display;

document.addEventListener('DOMContentLoaded', function() {
	// Create the video (it's not inserted into the page)
	var video = document.createElement("video");
	//video.loop = "loop";
	video.preload = "auto";

	var videoSourceMp4 = document.createElement("source");
	videoSourceMp4.src = "./resource/video/punk-the-system.mp4";
	videoSourceMp4.type = "video/mp4";
	video.appendChild(videoSourceMp4)

	// Create the video playback controller
	playback = new Playback(video);
	setTimeout(function() {
		playback.seek(0);
		playback.play();
	}, 500);
	

	// Create the Display controller (it will handle the layers)
	display = new Display();

	// Create and insert the VideoLayer
	var videoLayer = new VideoLayer();
	videoLayer.setVideo(video);
	display.addLayer("video", videoLayer);
	
	// Create and insert HudLogoLayer
	var hudLogoLayer = new HudLogoLayer();
	hudLogoLayer.setActive(false);
	display.addLayer("hudLogo", hudLogoLayer);

	// Create and insert HudClockLayer
	var hudClockLayer = new HudClockLayer();
	hudClockLayer.setActive(false);
	display.addLayer("hudClock", hudClockLayer);

	// Create and insert HudAudioLayer
	var hudAudioLayer = new HudAudioLayer();
	hudAudioLayer.setMedia(video);
	hudAudioLayer.setActive(false);
	display.addLayer("hudAudio", hudAudioLayer);

	// Create and insert HudFilterLayer (filter buttons)
	var hudFilterLayer = new HudFilterLayer();
	hudFilterLayer.setActive(false);
	display.addLayer("hudFilter", hudFilterLayer);

	// Create and insert the doctor speech
	var drSpeech = new AnimatedSprite();
	drSpeech.setActive(false);
	drSpeech.setSpriteImage("./resource/image/dr-speech-sprites.jpg");
	drSpeech.setSpriteSize(480, 270);
	drSpeech.setDisplayPosition({
		left : 20,
		bottom : 200
	});
	drSpeech.setDisplaySize(240, 135);
	drSpeech.addAnimation("speak-close", [
		{ sprite :  0, duration : 100 },
		{ sprite :  1, duration : 100 },
		{ sprite :  2, duration : 100 },
		{ sprite :  4, duration : 100 }
	]);
	drSpeech.addAnimation("speak-far", [
		{ sprite :  9, duration : 100 },
		{ sprite : 10, duration : 100 },
		{ sprite : 11, duration : 100 },
		{ sprite : 18, duration : 100 },
		{ sprite : 20, duration : 100 }
	]);
	drSpeech.addAnimation("speak-very-far", [
		{ sprite : 55, duration : 100 },
		{ sprite : 57, duration : 100 }
	]);
	drSpeech.addAnimation("idle", [
		//{ sprite : 25, duration : 100 },
		//{ sprite :  9, duration : 100 },
		//{ sprite :  8, duration : 100 }
		{ sprite :  4, duration : 250 },
		{ sprite :  2, duration : 250 },
	]);
	drSpeech.addAnimation("scratch-front", [
		{ sprite : 28, duration : 100 },
		{ sprite : 43, duration : 100 },
		{ sprite : 50, duration : 100 },
		{ sprite : 54, duration : 100 },
		{ sprite : 56, duration : 100 }
	]);
	drSpeech.addAnimation("scratch-ear", [
		{ sprite : 15, duration : 100 },
		{ sprite : 48, duration : 100 },
		{ sprite : 53, duration : 100 }
	]);
	drSpeech.addAnimation("speak-right", [
		{ sprite : 24, duration : 100 },
		{ sprite : 26, duration : 100 },
		{ sprite : 30, duration : 100 },
		{ sprite : 32, duration : 100 },
		{ sprite : 12, duration : 100 },
		{ sprite : 13, duration : 100 },
		{ sprite : 16, duration : 100 },
		{ sprite : 17, duration : 100 }
	]);
	display.addLayer("drSpeech", drSpeech);

	var invasionGame = new InvasionGame();
	invasionGame.setActive(false);
	display.addLayer("invasionGame", invasionGame);

	var alertMessage = new AlertMessage();
	alertMessage.setActive(false);
	display.addLayer("alertMessage", alertMessage);

	var hudGlitchLayer = new HudGlitchLayer();
	//hudGlitchLayer.setActive(false);
	display.addLayer("hudGlitch", hudGlitchLayer);

	var noiseLayer = new NoiseLayer();
	noiseLayer.setActive(false);
	display.addLayer("noise", noiseLayer);

	// Video glitches example
	/*window.setInterval(function() {
		var duration = 10 + Math.floor(Math.random() * 250);
		videoLayer.addGlitch({
			amount     : 1,
			seed       : 1,
			iterations : 3,
			quality    : 90
		}, duration);
	}, 1000);*/

	// Display loop and FPS counter handling
	var fps = 0;
	var fpsCounter = document.getElementById("fps-counter");
	var fpsMax = 30;
	var fpsMaxLastDraw = 0;
	var fpsMaxMinDelay = 1000/fpsMax;

	function displayLoop(time) {
		var timeSinceLastDraw = time - fpsMaxLastDraw; // Time since last draw
		if (timeSinceLastDraw >= fpsMaxMinDelay) {
			fpsMaxLastDraw = time;

			display.clear();
			display.draw(timeSinceLastDraw);
			fps++;
		}

		requestAnimationFrame(displayLoop);
	}
	requestAnimationFrame(displayLoop);

	window.setInterval(function() {
		fpsCounter.innerHTML = fps + "fps";
		fps = 0;
	}, 1000);
});