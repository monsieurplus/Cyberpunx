var JpegGlitch = function() {
	var _active = false;
	var _viewportDimension;
	var _context;

	// Local variables
	var _glitchImage; // Current glitch image
	var _glitchStart = -10000;
	var _glitchDurations = [];
	var _glitchParams;

	var _init = function() {
		// HERE Initialization of the layer
	};

	var _resetGlitch = function() {
		_glitchImage = undefined;
		_glitchStart = 0;
		_glitchDurations = [];
	};

	var _createGlitchImage = function(params) {
		// Draw the current video frame to the canvas
		//_drawVideo();

		// Extract the current video frame from the canvas
		var currentFrame = _context.getImageData(0, 0, _viewportDimension.width, _viewportDimension.height); 

		// Launch glitch creation
		glitch(currentFrame, params, function(glitchImage) {
			_glitchImage = glitchImage;
		});

		_glitchStart = new Date().getTime();
	};

	var _checkGlitch = function() {
		if (_glitchDurations.length === 0) {
			return false;
		}

		// If there is a scheduled glitch but none displayed
		if (!_glitchImage) {
			// Create the first glitch
			_createGlitchImage(_glitchParams);
		}
		else {
			// The current glitch time is elapsed
			var now = new Date().getTime();
			if (now > (_glitchStart + _glitchDurations[0])) {
				// Remove the duration of the first glitch (it is over)
				_glitchDurations.shift();

				// Create the next glitched image
				if (_glitchDurations.length > 0) {
					_createGlitchImage(_glitchParams);
				}
				else {
					_resetGlitch();
				}
			}
		}
	};

	this.addGlitch = function(params, duration) {
		_glitchParams = params
		_glitchDurations.push(duration);
	};

	this.addGlitches = function(params, durations) {
		_glitchParams = params
		_glitchDurations.concat(durations);
	};

	this.resetGlitches = function() {
		_resetGlitch();
	};

	/**
	 * REQUIRED
	 */
	this.draw = function() {
		_checkGlitch();
		if (_glitchImage) {
			_context.putImageData(_glitchImage, 0, 0);
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