var Fullscreen = function() {
	/**
	 * Checks if fullscreen is supported
	 */
	this.supported = function() {
		return (
			document.documentElement.requestFullscreen ||
			document.documentElement.mozRequestFullscreen ||
			document.documentElement.webitRequestFullscreen
		);
	};

	/**
	 * Checks if fullscreen is active
	 */
	this.is = function() {
		return (
			document.fullscreenElement ||
			document.mozFullScreenElement ||
			document.webkitFullscreenElement
		);
	};

	/**
	 * Turns fullscreen on
	 */
	this.on = function() {
		if (document.documentElement.requestFullscreen)	{
			document.documentElement.requestFullscreen();
		} 
		else if (document.documentElement.mozRequestFullScreen) {
			document.documentElement.mozRequestFullScreen();
		}
		else if (document.documentElement.webkitRequestFullscreen) {
			document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
		}
	};

	/**
	 * Turns fullscreen off
	 */
	this.off = function() {
		if (document.cancelFullScreen) {
			document.cancelFullScreen();
		} 
		else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		} 
		else if (document.webkitCancelFullScreen) {
			document.webkitCancelFullScreen();
		}
	};

	this.toggle = function() {
		if (this.is()) {
			this.off();
		}
		else {
			this.on();
		}
	};
};