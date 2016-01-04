var NoiseLayer = function() {
	var _active = false;
	var _viewportDimension;
	var _context;

	// Local variables
	var _noiseImage;
	var _noiseOpacity = 1;

	var _init = function() {
		_noiseImage = new Image();
		//_noiseImage.src = "./resource/image/noise-bw.png";
		_noiseImage.src = "./resource/image/noise-bw-dark.png";
		//_noiseImage.src = "./resource/image/noise-color.png";
	};

	this.setOpacity = function(opacity) {
		_noiseOpacity = opacity;
	};

	/**
	 * REQUIRED
	 */
	this.draw = function() {
		_context.globalAlpha = _noiseOpacity;

		_drawNoise(_noiseImage);

		_context.globalAlpha = 1;
	};

	var _drawNoise = function(image) {
		if (!image.width || !image.height) {
			return false;
		}

		var startX = - Math.floor(Math.random() * image.width);
		var startY = - Math.floor(Math.random() * image.height);

		for (var x = startX; x < _viewportDimension.width; x += image.width) {
			for (var y = startY; y < _viewportDimension.height; y += image.height) {
				_context.drawImage(_noiseImage, x, y, image.width, image.height);
			}
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