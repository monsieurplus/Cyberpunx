var VignetteLayer = function() {
	var _active = true;
	var _viewportDimension;
	var _context;

	// Local variables
	var _image;

	var _init = function() {
		_image = new Image();
		_image.src = "./resource/image/vignette-hud.png";
	};

	/**
	 * REQUIRED
	 */
	this.draw = function() {
		_context.drawImage(_image, 0, 0, _viewportDimension.width, _viewportDimension.height);
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