document.addEventListener('DOMContentLoaded', function() {
	var drSpeech = display.getLayer("drSpeech");
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

	var puttiSpeech = display.getLayer("puttiSpeech");
		puttiSpeech.addAnimation("wide", [{ sprite : 0, duration : 100 }]);
	puttiSpeech.addAnimation("zoom", [
		{ sprite : 0, duration : 250 },
		{ sprite : 1, duration : 250 },
		{ sprite : 2, duration : 250 },
		{ sprite : 3, duration : 250 },
		{ sprite : 4, duration : 250 }
	]);
	puttiSpeech.addAnimation("scary", [{ sprite : 4, duration : 100 }]);
	puttiSpeech.addAnimation("idle", [
		{ sprite : 4, duration : 750 },
		{ sprite : 8, duration : 750 }
	]);

	// Generate a random speak animation
	var speakAnimation = [];
	var animationLength = 50;
	for (var i = 0; i < animationLength; i++) {
		var spriteIndex = 4 + Math.floor(Math.random() * 5);
		var spriteDuration = 50 + Math.random() * 250;
		speakAnimation.push({ sprite : spriteIndex, duration : spriteDuration });
	}
	puttiSpeech.addAnimation("speak", speakAnimation);
});