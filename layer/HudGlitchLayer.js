var HudGlitchLayer = function() {
	var _active = true;
	var _viewportDimension;
	var _context;

	// Local variables

	var _init = function() {
		// HERE Initialization of the layer
	};

	/**
	 * REQUIRED
	 */
	this.draw = function() {
		var randomBool = Math.random() * 100;
		if (randomBool < 80) {
			return false;
		}

		// HERE Drawing process of the layer
		var glitchNumber = Math.floor(Math.random() * 10);
		for (var i=0; i < glitchNumber; i++) {
			var xSource = Math.random() * _viewportDimension.width;
			var ySource = Math.random() * _viewportDimension.height;
			var wSource = Math.random() * _viewportDimension.width / 10;
			var hSource = Math.random() * _viewportDimension.height / 10;
			var xTarget = Math.random() * _viewportDimension.width;
			var yTarget = Math.random() * _viewportDimension.height;

			var extract = _context.getImageData(xSource, ySource, wSource, hSource);
			_context.putImageData(extract, xTarget, yTarget);
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