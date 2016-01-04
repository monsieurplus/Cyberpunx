var BootLogo = function() {
	var _active = false;
	var _viewportDimension;
	var _context;

	// Local variables
	var _image;
	var _imageWidth = 30;

	/*
	0 : Stopped
	1 : Transitioning to opaque
	2 : Opaque
	3 : Transitioning to transparent
	*/
	var _animationStep = 0;
	var _animationStart = -10000;
	var _animationDuration = 1000;

	var _init = function() {
		_image = new Image();
		_image.src = "./resource/image/putti-logo.png";
	};

	/**
	 * REQUIRED
	 */
	this.draw = function() {
		if (!_checkImageLoading()) {
			return false;
		}

		if (_animationStep === 0) {
			return false;
		}

		// Check switching to the next step
		var now = new Date().getTime();
		var ellapsed = now - _animationStart;
		if (ellapsed > _animationDuration) {
			_animationStep++;
			_animationStart = now;
		}

		if (_animationStep === 4) {
			_animationStep = 0;
		}

		if (_animationStep === 0) {
			return false;
		}

		var progress = ellapsed / _animationDuration;
		var start, end;

		switch (_animationStep) {
			case 1:
				start = 0;
				end = 1;
			break;

			case 2:
				start = 1;
				end = 1;
			break;

			case 3:
				start = 1;
				end = 0;
			break;
		}

		var alpha = start + (end - start) * progress;
		_context.globalAlpha = alpha;

		// Draw the centered image
		var targetW = _viewportDimension.width * _imageWidth / 100;
		var targetH = _image.naturalHeight * targetW / _image.naturalWidth;
		var targetX = (_viewportDimension.width - targetW) / 2;
		var targetY = (_viewportDimension.height - targetH) / 2;

		_context.drawImage(_image, targetX, targetY, targetW, targetH);

		// Reset alpha
		_context.globalAlpha = 1;
	};

	this.startAnimation = function() {
		_animationStep = 1;
		_animationStart = new Date().getTime();
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