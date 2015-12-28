var AnimatedSprite = function() {
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

	var _animations = {}; // Name indexed animations
	/* {
		standing : [
			{
				sprite : 0,
				duration : 100
			},
			{
				sprite : 1,
				duration : 100
			}
		],
		walking : [
			...
		]
	} */
	var _animationPaused = true;
	var _animationCurrent = false; // Name of the current animation
	var _animationCurrentStepIndex = 0; // Current animation displayed step
	var _animationCurrentStepStart = 0; // Current step start microtime

	var _init = function() {
		// HERE Initialization of the layer
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
	this.draw = function() {
		// If no animation is the current one OR the current one doesn't exist
		if (!_animationCurrent || !_animations[_animationCurrent]) {
			return false;
		}

		// Get the current animation
		var currentAnimation = _animations[_animationCurrent];

		// Check if the current step is still the good one
		var now = new Date().getTime();
		if (_animationCurrentStepStart + currentAnimation[_animationCurrentStepIndex].duration < now) {
			_animationCurrentStepStart = new Date().getTime();

			// Increment _animationCurrentStepIndex
			_animationCurrentStepIndex++;
			if (_animationCurrentStepIndex > currentAnimation.length - 1) {
				// Loop the animation
				_animationCurrentStepIndex = 0;
			}
		}

		var currentStep = currentAnimation[_animationCurrentStepIndex];

		// Compute draw coordinates
		var sourceX = 0;
		var sourceY = currentStep.sprite * _spriteHeight;
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

		// Display the sprite
		_context.drawImage(
			_spriteImage,
			sourceX, sourceY,
			sourceW, sourceH,
			targetX, targetY,
			targetW, targetH
		);
	};

	this.addAnimation = function(name, steps) {
		_animations[name] = steps;
	};

	this.playAnimation = function(name) {
		// Check if the animation exists
		if (!_animations[name]) {
			return false;
		}

		_animationCurrent = name;
		_animationCurrentStep = 0;
		_animationCurrentStepStart = new Date().getTime();
		_animationCurrentStepIndex = 0;
	};

	this.stopAnimation = function() {
		_animationCurrent = false;
		_animationCurrentStep = 0;
		_animationCurrentStepStart = 0;
		_animationCurrentStepIndex = 0;
	};

	this.pause = function() {
		_animationPaused = true;
	};
	this.unpause = function() {
		_animationPause = false;
	}

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