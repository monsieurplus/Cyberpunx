var HudSpeech = function() {
	var _active = true;
	var _viewportDimension;
	var _context;

	// Local variables
	var _spriteImage = new Image(); // Image object of the sprite sheet
	var _spriteWidth;
	var _spriteHeight;

	var _displayWidth;
	var _displayHeight;
	var _displayPosition = {};

	var _animationArray = []; // Array telling which sprite to display at which time
	var _animationCurrent = 0; // Current displayed step
	var _animationStart; // Time when the current step has begun display
	var _animationPaused = true;

	var _init = function() {
		// HERE Initialization of the layer
	};

	/**
	 * REQUIRED
	 */
	this.draw = function() {
		if (_animationArray.length === 0) {
			return false;
		}

		if (_animationPaused) {
			return false;
		}

		// Get current sprite infos
		var current = _animationArray[_animationCurrent];

		if (!current) {
			return false;
		}

		// Check if the current sprite is still the good one
		var now = new Date().getTime();
		if (_animationStart + current.duration < now || !_animationStart) {
			_animationStart = new Date().getTime();
			_animationCurrent++;
		}

		if (_animationCurrent >= _animationArray.length) {
			return false;
		}

		// Compute draw coordinates
		var sourceX = 0;
		var sourceY = current.index * _spriteHeight;
		var sourceW = _spriteWidth;
		var sourceH = _spriteHeight;

		var targetX, targetY;
		var targetW = _displayWidth;
		var targetH = _displayHeight;

		// Positionned from left
		if (typeof _displayPosition.left !== "undefined") {
			targetX = _displayPosition.left;
		}
		// Positionned from right
		else if (typeof _displayPosition.right !== "undefined") {
			targetX = _viewportDimension.width - _displayPosition.right - _displayWidth;
		}
		// Horizontally centered
		else {
			targetX = Math.ceil(_viewportDimension.width / 2 - _displayWidth / 2);
		}

		// Positionned from top
		if (typeof _displayPosition.top !== "undefined") {
			targetY = _displayPosition.top;
		}
		// Positionned from bottom
		else if (typeof _displayPosition.bottom !== "undefined") {
			targetY = _viewportDimension.height - _displayPosition.bottom - _displayHeight;
		}
		// Vertically centered
		else {
			targetY = Math.ceil(_viewportDimension.height / 2 - _displayHeight / 2);
		}

		// Change the way things are drawn into canvas
		var oldCompositeOperation = _context.globalCompositeOperation;
		_context.globalCompositeOperation = 'lighter';

		// Display the sprite
		_context.drawImage(
			_spriteImage,
			sourceX, sourceY,
			sourceW, sourceH,
			targetX, targetY,
			targetW, targetH
		);

		// Reset the way things are drawn into canvas
		_context.globalCompositeOperation = oldCompositeOperation;
	};

	this.play = function() {
		_animationPaused = false;
	};

	this.pause = function() {
		_animationPaused = true;
	}

	this.reset = function() {
		_animationCurrent = 0;
	}

	this.setAnimation = function(animation) {
		_animationArray = animation;
	};


	this.setSpriteSize = function(width, height) {
		_spriteWidth = width;
		_spriteHeight = height;
	};

	this.setSpriteImage = function(url) {
		_spriteImage.src = url;
	};

	this.setDisplaySize = function(width, height) {
		_displayWidth = width;
		_displayHeight = height;
	};

	this.setDisplayPosition = function(position) {
		_displayPosition = position;
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