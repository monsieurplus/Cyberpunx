var GlitchLayer = function() {
	var _active = true;
	var _viewportDimension;
	var _context;

	// Local variables
	var _glitchStart;
	var _glitchDuration;
	var _glitchCreating;
	var _glitchParams;
	var _glitchImage;

	var _init = function() {
	};

	/**
	 * REQUIRED
	 */
	this.draw = function() {
		// If we have a scheduled glitch
		if (_glitchStart !== undefined) {
			var now = new Date().getTime();

			// If there is no glitch image created
			if (!_glitchImage) {
				// Launch glitch creation (if not already launched)
				if (!_glitchCreating) {
					_createGlitch(_glitchParams);
				}
			}

			// If there is a glitch image
			else {
				// If the glitch display duration is over
				if ((_glitchStart + _glitchDuration) <= now) {
					console.debug("reset glitch");
					_resetGlitch();
				}
				// Else the glitch must be displayed
				else {
					console.debug("display glitch");
					_context.putImageData(_glitchImage, 0, 0);
				}
			}
		}

	};

	var _createGlitch = function(params) {
		var currentImage = _context.getImageData(0, 0, _viewportDimension.width, _viewportDimension.height); 

		_glitchCreating = true;
		glitch(currentImage, params, function(glitchImage) {
			_glitchImage = glitchImage;
			//_glitchStart = new Date().getTime();
			_glitchCreating = false;
		});
	};

	var _resetGlitch = function() {
		_glitchStart = undefined;
		_glitchDuration = undefined;
		_glitchCreating = false;
		_glitchParams = undefined;
		_glitchImage = undefined;
	};

	/**
	 * Return a random int between min and max (included)
	 */
	var _randomInt = function(min, max) {
		return Math.floor(Math.random() * (max - min +1)) + min;
	};


	this.glitch = function(level, duration) {
		// If a glitch was displayed, the new one replaces it
		_resetGlitch();

		_glitchStart = new Date().getTime();
		_glitchDuration = duration;

		switch (level) {
			// Level 1 : From "not modified" to "modified by still recognizable"
			case 1: 
				_glitchParams = {
					amount     : 0,
					seed       : 1,
					iterations : 3,
					quality    : 50
				};
			break;
		}
	};

	/**
	 * REQUIRED
	 */
	this.setViewportDimension = function(dimension) {
		_viewportDimension = dimension;
	};

	/**
	 * REQUIRED
	 */
	this.setContext = function(context) {
		_context = context;
	};

	/**
	 * REQUIRED
	 */
	this.isActive = function() {
		return _active;
	};

	/**
	 * REQUIRED
	 */
	this.setActive = function(active) {
		_active = active;
	};
	
	/**
	 * REQUIRED
	 */
	this.click = function(x, y) {
		// HERE Detect if something has been hit, if so, return true
		
		// If nothing has been hit, return false
		return false;
	};

	_init();
};

// Auto-include the "glitch" library
(function() {
	document.addEventListener('DOMContentLoaded', function() {
		var glitchScript = document.createElement("script");
		glitchScript.type = "text/javascript";
		glitchScript.src = "./lib/glitch-canvas.min.js";
		document.body.appendChild(glitchScript);
	});
}());