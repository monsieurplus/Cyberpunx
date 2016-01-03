var HudLogoLayer = function() {
	var _active = true;
	var _viewportDimension;
	var _context;

	// Local variables
	var _image;

	var _init = function() {
		_image = new Image();
		_image.src = "./resource/image/hud-logo-putti.png";
	};

	/**
	 * REQUIRED
	 */
	this.draw = function() {
		// Draw the logo
		var drawWidth = _viewportDimension.width / 5;
		var drawHeight = (drawWidth * _image.height) / _image.width;

		_context.drawImage(
			_image,
			_viewportDimension.width - (drawWidth + 20),
			_viewportDimension.height - (drawHeight + 20),
			drawWidth,
			drawHeight
		);
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