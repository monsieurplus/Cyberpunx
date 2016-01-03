/* Timed events scripting */
document.addEventListener("DOMContentLoaded", function() {
	// Displays a video time counter
	var timeCounter = document.getElementById("time-counter");
	playback.progress(function(position) {
		timeCounter.innerHTML = Math.round(position * 100) / 100;
	});

	var setActiveHud = function(active) {
		display.getLayer("hudClock").setActive(active);
		display.getLayer("hudAudio").setActive(active);
		display.getLayer("hudLogo").setActive(active);
	};

	// Scene 1 : Hospital : Awakening
	// Scene 2 : Home : Discovery of the implant
	// Scene 3 : Studio
	// Scene 4 : Home : Shelter
	// Scene 5 : Home : Attack of the implant
	// Scene 6 : Home : Punk End
	// Scene 7 : Home : Good citizen End

	// Scene 1 : Begginning
	playback.when(2.35, function() {
		setActiveHud(true);

		display.getLayer("hudClock").setTime("08:35:54");
	});

	// Scene 1 : End
	playback.when(34.9, function() {
		setActiveHud(false);
	});

	// Scene 2 : Begginning
	playback.when(37, function() {
		setActiveHud(true);

		display.getLayer("hudClock").setTime("11:13:41");

		display.getLayer("hudFilter").setActive(true);
	});

	// Scene 2 : Dr. speech start
	playback.when(43, function() {
		var drSpeech = display.getLayer("drSpeech");
		drSpeech.setActive(true);
		drSpeech.playAnimation("speak-close");
	});
	playback.when(45, function() {
		display.getLayer("drSpeech").playAnimation("scratch-front");
	});
	playback.when(48, function() {
		display.getLayer("drSpeech").playAnimation("speak-far");
	});
	playback.when(52, function() {
		display.getLayer("drSpeech").playAnimation("scratch-ear");
	});
	playback.when(55, function() {
		display.getLayer("drSpeech").playAnimation("speak-right");
	});
	playback.when(57, function() {
		display.getLayer("drSpeech").playAnimation("idle");
	});

	// Scene 2 : Dr speech end
	playback.when(76, function() {
		// Stop the filters
		display.getLayer("hudFilter").setActive(false);
		display.getLayer("video").resetFilter();

		// Stop the doctor
		display.getLayer("drSpeech").setActive(false);
	});

	// Scene 2 : Music interruption
	playback.when(85, function() {
		var alertMessage = display.getLayer("alertMessage");
		alertMessage.setMessage("ALLOCUTION PRESIDENTIELLE OBLIGATOIRE");
		alertMessage.setColor("#6AFF0B");
		alertMessage.setBlinkSpeed(500);
		alertMessage.setActive(true);
	});

	// Scene 2 : Putti speech begins
	playback.when(90, function() {});

	// Scene 2 : End
	playback.when(120, function() {
		display.getLayer("alertMessage").setActive(false);

		setActiveHud(false);
	});

	// Scene 3 : Beggining
	playback.when(122, function() {
		setActiveHud(true);

		display.getLayer("hudClock").setTime("19:04:09");
	});

	// Scene 3 : Music starts
	playback.when(150, function() {});

	// Scene 3 : Censorship start
	playback.when(165, function() {
		var alertMessage = display.getLayer("alertMessage");
		alertMessage.setMessage("CONTENU PROHIBE DETECTE");
		alertMessage.setColor("#6AFF0B");
		alertMessage.setBlinkSpeed(250);
		alertMessage.setActive(true);

		var karaokeGame = display.getLayer("karaokeGame");
		karaokeGame.setActive(true);
	});

	// Scene 3 : Censored lyrics 1
	playback.when(173, function() {
		var karaokeGame = display.getLayer("karaokeGame");
		karaokeGame.nextLyrics();
	})

	// Scene 3 : Censored lyrics 2
	playback.when(176, function() {
		var karaokeGame = display.getLayer("karaokeGame");
		karaokeGame.nextLyrics();
	})

	// Scene 3 : Censored lyrics 3
	playback.when(179, function() {
		var karaokeGame = display.getLayer("karaokeGame");
		karaokeGame.nextLyrics();
	})

	// Scene 3 : Censored lyrics 4
	playback.when(181, function() {
		var karaokeGame = display.getLayer("karaokeGame");
		karaokeGame.nextLyrics();
	})

	// Scene 3 : Censored lyrics 5
	playback.when(187, function() {
		var karaokeGame = display.getLayer("karaokeGame");
		karaokeGame.nextLyrics();
	})

	// Scene 3 : Censored lyrics 6
	playback.when(191, function() {
		var karaokeGame = display.getLayer("karaokeGame");
		karaokeGame.nextLyrics();
	})

	// Scene 3 : Censored lyrics 7
	playback.when(194, function() {
		var karaokeGame = display.getLayer("karaokeGame");
		karaokeGame.nextLyrics();
	})

	// Scene 3 : Censored lyrics 8
	playback.when(196, function() {
		var karaokeGame = display.getLayer("karaokeGame");
		karaokeGame.nextLyrics();
	})

	// Scene 3 : Music end
	playback.when(198, function() {
		display.getLayer("alertMessage").setActive(false);
		display.getLayer("karaokeGame").setActive(false);
	});

	// Scene 3 : End
	playback.when(210, function() {
		setActiveHud(false);
	});			

	// Scene 4 : Beginning
	playback.when(213, function() {
		setActiveHud(true);

		display.getLayer("hudClock").setTime("23:05:30");
	});

	// Scene 4 : End
	playback.when(240, function() {
		setActiveHud(false);
		display.getLayer("hudClock").setTime("03:00:37");
	});

	// Scene 5 : Implant boot
	playback.when(246, function() {
		setActiveHud(true);
	});

	// Scene 5 : Update start
	playback.when(249, function() {
		var alertMessage = display.getLayer("alertMessage");
		alertMessage.setMessage("MISE A JOUR EN COURS");
		alertMessage.setColor("#6AFF0B");
		alertMessage.setBlinkSpeed(500);
		alertMessage.setActive(true);

		var invasionGame = display.getLayer("invasionGame");
		invasionGame.setActive(true);
		invasionGame.setAttackerSize(5);
		invasionGame.setAttackerSpeed(5);
		invasionGame.setAttackerDelay(2000);
		invasionGame.setAttackerStrength(1);
		invasionGame.setAttackerColor("#6AFF0B");

		invasionGame.setFailureCallback(function() {
			// Jump to scene 7
			invasionGame.setActive(false);
			playback.seek(382);
		});
	});

	// Scene 5 : Awakening
	playback.when(255, function() {
		var alertMessage = display.getLayer("alertMessage");
		alertMessage.setColor("blue");
		alertMessage.setBlinkSpeed(250);

		var invasionGame = display.getLayer("invasionGame");
		invasionGame.setAttackerSize(5);
		invasionGame.setAttackerSpeed(7.5);
		invasionGame.setAttackerDelay(1500);
		invasionGame.setAttackerStrength(2);
		invasionGame.setAttackerColor("blue");
	});

	playback.when(275, function() {
		var alertMessage = display.getLayer("alertMessage");
		alertMessage.setColor("red");
		alertMessage.setBlinkSpeed(100);

		var invasionGame = display.getLayer("invasionGame");
		invasionGame.setAttackerSize(10);
		invasionGame.setAttackerSpeed(12.5);
		invasionGame.setAttackerDelay(500);
		invasionGame.setAttackerStrength(5);
		invasionGame.setAttackerColor("red");
	});

	// Scene 5 : End
	playback.when(309, function() {
		setActiveHud(false);
		display.getLayer("alertMessage").setActive(false);
		display.getLayer("invasionGame").setActive(false);
	});

	// Scene 6 : Beginning
	playback.when(311, function() {
		setActiveHud(true);

		var alertMessage = display.getLayer("alertMessage");
		alertMessage.setMessage("ECHEC CRITIQUE");
		alertMessage.setColor("red");
		alertMessage.setBlinkSpeed(100);
		alertMessage.setActive(true);

		var hudGlitch = display.getLayer("hudGlitch");
		hudGlitch.setActive(true);
		hudGlitch.setParam("quantity", 4);
		hudGlitch.setParam("probability", 25);
		hudGlitch.setParam("width", 10);
		hudGlitch.setParam("height", 10);

		display.getLayer("hudClock").setTime("03:35:12");
	});

	var generateGlitch = function() {
		var duration = 10 + Math.floor(Math.random() * 250);
		display.getLayer("video").addGlitch({
			amount     : 5,
			seed       : 5,
			iterations : 5,
			quality    : 75
		}, duration);
	};

	var changeMessage = function() {
		var messages = [
			"INTERFACE DEFAILLANTE",
			"CONNEXION INCOMPLETE",
			"BIOSONDE DEFECTUEUSE",
			"NIVEAU ENERGIE CRITIQUE",
			"MENACE EXTERIEURE DETECTEE",
			"ANCRAGE NEURONAL ENDOMMAGE",
			"FONCTION NORMALISATRICE COMPROMISE",
			"ANCRAGE CRANIEN DEFAILLANT",
			"IMPLANTATION NERVEUSE INCORRECTE"
		];

		var colors = ["red", "magenta", "pink", "fushia", "white"];

		var alertMessage = display.getLayer("alertMessage");
		alertMessage.setMessage(messages[Math.floor(Math.random() * messages.length)]);
		alertMessage.setColor(colors[Math.floor(Math.random() * colors.length)]);
		alertMessage.setBlinkSpeed(50 + Math.random() * 200);
		alertMessage.setActive(true);
	};

	// Scene 6 : First grip to remove the implant
	playback.when(329, function() {
		changeMessage();

		generateGlitch();

		var hudGlitch = display.getLayer("hudGlitch");
		hudGlitch.setActive(true);
		hudGlitch.setParam("quantity", 10);
		hudGlitch.setParam("probability", 50);
		hudGlitch.setParam("width", 10);
		hudGlitch.setParam("height", 10);
	});
	playback.when(330, function() {
		changeMessage();
		generateGlitch();
	});
	playback.when(331, function() {
		changeMessage();
		generateGlitch();
		generateGlitch();
	});
	playback.when(332, function() {
		changeMessage();
		generateGlitch();
		generateGlitch();
	});

	playback.when(333, function() {
		changeMessage();
		generateGlitch();
		generateGlitch();
	});
	playback.when(334, function() {
		changeMessage();
		generateGlitch();
		generateGlitch();
	});
	playback.when(335, function() {
		changeMessage();
		generateGlitch();
		generateGlitch();
	});
	playback.when(336, function() {
		changeMessage();
		generateGlitch();
		generateGlitch();
	});
	playback.when(337, function() {
		changeMessage();
		generateGlitch();
		generateGlitch();

		var hudGlitch = display.getLayer("hudGlitch");
		hudGlitch.setActive(true);
		hudGlitch.setParam("quantity", 50);
		hudGlitch.setParam("probability", 75);
		hudGlitch.setParam("width", 10);
		hudGlitch.setParam("height", 10);
	});
	playback.when(338, function() {
		changeMessage();
		generateGlitch();
		generateGlitch();
	});
	playback.when(339, function() {
		changeMessage();
		generateGlitch();
		generateGlitch();
	});
	playback.when(340, function() {
		changeMessage();
		generateGlitch();
		generateGlitch();
	});

	playback.when(341, function() {
		changeMessage();
		generateGlitch();
		generateGlitch();
	});
	playback.when(342, function() {
		changeMessage();
		generateGlitch();
		generateGlitch();
	});
	playback.when(343, function() {
		changeMessage();
		generateGlitch();
		generateGlitch();
	});

	// Scene 6 : Implant on the ground
	playback.when(344, function() {
		var alertMessage = display.getLayer("alertMessage");
		alertMessage.setMessage("ORGANISME HOTE INTROUVABLE");
		alertMessage.setColor("red");
		alertMessage.setBlinkSpeed(100);
		alertMessage.setActive(true);

		var hudGlitch = display.getLayer("hudGlitch");
		hudGlitch.setActive(true);
		hudGlitch.setParam("quantity", 50);
		hudGlitch.setParam("probability", 100);
		hudGlitch.setParam("width", 20);
		hudGlitch.setParam("height", 20);
	});

	// Scene 6 : Credits start
	playback.when(347.5, function() {
		display.getLayer("alertMessage").setActive(false);
		setActiveHud(false);
	});

	// Scene 6 : Credits end
	playback.when(380, function() {
		playback.pause();
	});

	// Scene 7 : Beggining
	playback.when(382, function() {
		setActiveHud(true);

		display.getLayer("hudClock").setTime("03:35:12");
	});

	// Scene 7 : change of light
	playback.when(398, function() {});

	// Scene 7 : music volume increase
	playback.when(455, function() {});

	// Scene 7 : Credits start
	playback.when(470, function() {
		setActiveHud(false);
	});

	// Scene 7 : Credits end
	playback.when(498, function() {
		playback.pause();
	});
});