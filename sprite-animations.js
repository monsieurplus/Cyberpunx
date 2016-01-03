document.addEventListener('DOMContentLoaded', function() {
	/* Dr Speech */
	var drSpeech = display.getLayer("drSpeech");
	drSpeech.addAnimation("idle", [{ sprite : 7, duration : 100 }]);

	// Generate a random speak animation
	var drSpeakAnimation = [];
	var animationLength = 50;
	for (var i = 0; i < animationLength; i++) {
		var spriteIndex = Math.floor(Math.random() * 8);
		var spriteDuration = 50 + Math.random() * 100;
		drSpeakAnimation.push({ sprite : spriteIndex, duration : spriteDuration });
	}
	drSpeech.addAnimation("speak", drSpeakAnimation);

	/* Putti Speech */
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
	var puttiSpeakAnimation = [];
	var animationLength = 50;
	for (var i = 0; i < animationLength; i++) {
		var spriteIndex = 4 + Math.floor(Math.random() * 5);
		var spriteDuration = 50 + Math.random() * 250;
		puttiSpeakAnimation.push({ sprite : spriteIndex, duration : spriteDuration });
	}
	puttiSpeech.addAnimation("speak", puttiSpeakAnimation);
});