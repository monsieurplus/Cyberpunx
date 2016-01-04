var AnimatedSprite = function() {
	var _active = false;
	var _viewportDimension;
	var _context;

	// Local variables
	var _spriteImage = new Image(); // Image object of the sprite sheet
	var _spriteWidth;
	var _spriteHeight;

	var _displayWidth; // Percents of the screen width
	var _displayPosition = {}; // Wanted display coordinates in percent from top or bottom / left or right
	var _displayCoordinates = {}; // Real display coordinates in pixels

	var _clickHandler;

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
		_computeDisplayCoordinates();
	};

	this.setSpriteImage = function(url) {
		_spriteImage.src = url;
	};

	this.setDisplayWidth = function(percentWidth) {
		_displayWidth = percentWidth;
		_computeDisplayCoordinates();
	};

	this.setClickHandler = function(clickHandler) {
		_clickHandler = clickHandler;
	};

	/**
	 * Defines where the sprite has to be displayed
	 * @params {object} position Object containing horizontal and vertical position (in percents)
	 *                  position.top
	 *                  position.bottom
	 *                  position.left
	 *                  position.right
	 * If no property is set for vertical or horizontal position the element will be centered
	 */
	this.setDisplayPosition = function(position) {
		_displayPosition = position;
		_computeDisplayCoordinates();
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

		// Display the sprite
		_context.drawImage(
			_spriteImage,
			sourceX, sourceY,
			sourceW, sourceH,
			_displayCoordinates.x, _displayCoordinates.y,
			_displayCoordinates.w, _displayCoordinates.h
		);
	};

	var _computeDisplayCoordinates = function() {
		if (!_viewportDimension || !_viewportDimension.width || !_viewportDimension.height) {
			return false;
		}

		var targetX, targetY;
		var targetW = (_displayWidth / 100) * _viewportDimension.width;
		var targetH = (targetW * _spriteHeight) / _spriteWidth;

		// Positionned from left
		if (typeof _displayPosition.left !== "undefined") {
			targetX = _displayPosition.left / 100 * _viewportDimension.width;
		}
		// Positionned from right
		else if (typeof _displayPosition.right !== "undefined") {
			targetX = _viewportDimension.width - (_displayPosition.right / 100 * _viewportDimension.width) - targetW;
		}
		// Horizontally centered
		else {
			targetX = (_viewportDimension.width - targetW) / 2;
		}

		// Positionned from top
		if (typeof _displayPosition.top !== "undefined") {
			targetY = _displayPosition.top / 100 * _viewportDimension.height;
		}
		// Positionned from bottom
		else if (typeof _displayPosition.bottom !== "undefined") {
			targetY = _viewportDimension.height - (_displayPosition.bottom / 100 * _viewportDimension.height) - targetH;
		}
		// Vertically centered
		else {
			targetY = Math.ceil(_viewportDimension.height / 2 - targetH / 2);
		}

		_displayCoordinates = {
			x : targetX,
			y : targetY,
			w : targetW,
			h : targetH
		};
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
		_computeDisplayCoordinates();
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
		if (!_clickHandler || typeof _clickHandler !== "function") {
			return false;
		}

		if (
			x > _displayCoordinates.x &&
			x < (_displayCoordinates.x + _displayCoordinates.w) &&
			y > _displayCoordinates.y &&
			y < (_displayCoordinates.y + _displayCoordinates.h)
		) {
			_clickHandler();
		}
		
		// If nothing has been hit, return false
		return false;
	};

	_init();
};