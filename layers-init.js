/* Layers init */

// Globals
var playback, display, fullscreen, sfx;

document.addEventListener('DOMContentLoaded', function() {
	// Create the sfx Howler instance
	sfx = new Howl({
		urls : ["./resource/sound/sfx.mp3", "./resource/sound/sfx.wav"],
		sprite : {
			noise_increase : [0, 4600],
			hurt1 : [4700, 300],
			hurt2 : [5000, 300],
			pouic : [5300, 100],
			prout : [5400, 200]
		}
	});

	// Create the fullscreen instance
	fullscreen = new Fullscreen();

	// Create the video (it's not inserted into the page)
	var video = document.createElement("video");
	video.preload = "auto";

	var videoSourceMp4 = document.createElement("source");
	videoSourceMp4.src = "./resource/video/punk-the-system.mp4";
	videoSourceMp4.type = "video/mp4";
	video.appendChild(videoSourceMp4)

	/*
	var videoSourceOgg = document.createElement("source");
	videoSourceOgg.src = "./resource/video/punk-the-system.ogg";
	videoSourceOgg.type = "video/ogg";
	video.appendChild(videoSourceOgg)
	*/

	// Create the video playback controller
	playback = new Playback(video);
	playback.pause();

	// Create the Display controller (it will handle the layers)
	display = new Display();

	// Create and insert the VideoLayer
	var videoLayer = new VideoLayer();
	videoLayer.setVideo(video);
	videoLayer.setActive(true);
	display.addLayer("video", videoLayer);

	var website = new Website();
	display.addLayer("website", website);

	var noiseLayer = new NoiseLayer();
	display.addLayer("noise", noiseLayer);

	// Create and insert the Vignette Layer
	var vignette = new VignetteLayer();
	display.addLayer("vignette", vignette);
	
	// Create and insert Boot logo
	var bootLogo = new BootLogo();
	display.addLayer("bootLogo", bootLogo);

	// Create and insert HUD logo
	var hudLogo = new AnimatedSprite();
	hudLogo.setSpriteImage("./resource/image/hud-logo-putti.png");
	hudLogo.setSpriteSize(625, 289);
	hudLogo.setDisplayPosition({ right : 2, bottom : 2 });
	hudLogo.setDisplayWidth(20);
	hudLogo.addAnimation("default", [{ sprite : 0, duration : 10000 }]);
	hudLogo.playAnimation("default");
	display.addLayer("hudLogo", hudLogo);

	// Create and insert HUD clock
	var hudClock = new HudClockLayer();
	hudClock.setFontSize(2);
	hudClock.setDisplayPosition({ top : 2, right : 2 });
	display.addLayer("hudClock", hudClock);

	// Create and insert HudAudioLayer
	var hudAudio = new HudAudioLayer();
	hudAudio.setMedia(video);
	hudAudio.setDisplayPosition({ left : 2, bottom : 2 });
	hudAudio.setDisplayWidth(20);
	hudAudio.setDisplayRatio(0.5);
	display.addLayer("hudAudio", hudAudio);

	// Create and insert filter button
	var hudFilter = new ButtonGroup();
	hudFilter.setDisplayWidth(50);
	hudFilter.setDisplayRatio(0.2);
	hudFilter.setDisplayPosition({ bottom : 2 });
	display.addLayer("hudFilter", hudFilter);

	// Create and insert the doctor speech
	var drSpeech = new AnimatedSprite();
	drSpeech.setSpriteImage("./resource/image/dr-sprites.jpg");
	drSpeech.setSpriteSize(480, 270);
	drSpeech.setDisplayPosition({ left : 2, bottom : 20 });
	drSpeech.setDisplayWidth(20);
	display.addLayer("drSpeech", drSpeech);

	var puttiSpeech = new AnimatedSprite();
	puttiSpeech.setSpriteImage("./resource/image/putti-sprites.jpg");
	puttiSpeech.setSpriteSize(752, 515);
	puttiSpeech.setDisplayWidth(50);
	display.addLayer("puttiSpeech", puttiSpeech);	

	var invasionGame = new InvasionGame();
	display.addLayer("invasionGame", invasionGame);

	var karaokeGame = new KaraokeGame();
	karaokeGame.setActive(false);
	display.addLayer("karaokeGame", karaokeGame);

	var alertMessage = new AlertMessage();
	display.addLayer("alertMessage", alertMessage);

	var instruction = new AnimatedSprite();
	instruction.setSpriteImage("./resource/image/instructions.png");
	instruction.setSpriteSize(512, 512);
	instruction.setDisplayWidth(10);
	instruction.setDisplayPosition({ bottom : 2 });
	instruction.addAnimation("click", [
		{ sprite : 0, duration : 500 },
		{ sprite : 1, duration : 500 },
	]);
	display.addLayer("instruction", instruction);

	var hudGlitchLayer = new HudGlitchLayer();
	display.addLayer("hudGlitch", hudGlitchLayer);

	var jpegGlitch = new JpegGlitch();
	display.addLayer("jpegGlitch", jpegGlitch);

	var endMenu = new ButtonGroup();
	endMenu.setDisplayWidth(100);
	endMenu.setDisplayRatio(0.5);
	endMenu.setDisplayPosition({});
	display.addLayer("endMenu", endMenu);

	var startMenu = new ButtonGroup();
	startMenu.setDisplayWidth(100);
	startMenu.setDisplayRatio(0.5);
	startMenu.setDisplayPosition({});
	display.addLayer("startMenu", startMenu);

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