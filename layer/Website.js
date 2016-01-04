var Website = function() {
	var _active = false;
	var _viewportDimension;
	var _context;

	// Local variables
	var _image;

	var _init = function() {
		_image = new Image();
		_image.src = "./resource/image/website.jpg";
	};

	/**
	 * REQUIRED
	 */
	this.draw = function() {
		_context.fillStyle = "white";
		_context.fillRect(0, 0, _viewportDimension.width, _viewportDimension.height);

		if (_checkImageLoading()) {
			var targetW = _image.naturalWidth / 1.5;
			var targetH = _image.naturalHeight / 1.5;
			var targetY = 0;
			var targetX = (_viewportDimension.width - targetW) / 2;

			_context.drawImage(_image, targetX, targetY, targetW, targetH);
		}
	};

	var _checkImageLoading = function() {
		if (!_image.complete) {
			return false;
		}

		if (!_image.naturalWidth || !_image.naturalHeight) {
			return false;
		}

		return true;
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