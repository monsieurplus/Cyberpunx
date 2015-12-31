/* Window resizing handling */
document.addEventListener('DOMContentLoaded', function() {
	// window.resize event can fire quite fast, so we wait for the final resize to do something
	var resizeTimeout = null;

	var resizeEventHandler = function() {
		// Check if the display has been defined
		if (typeof display === "undefined") {
			return false;
		}

		// If a timeout is alive, we clear it
		if (resizeTimeout !== null) {
			clearTimeout(resizeTimeout);
		}

		// Launching a new timeout
		resizeTimeout = setTimeout(resizeTimeoutFinished, 500);
	};

	var resizeTimeoutFinished = function() {
		// Resize the display handler
		display.resize();

		// Back to null
		resizeTimeout = null;
	};

	window.addEventListener("resize", resizeEventHandler);
});