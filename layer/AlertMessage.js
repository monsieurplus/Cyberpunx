var AlertMessage = function() {
	var _active = true;
	var _viewportDimension;
	var _context;

	// Local variables
	var _message = "";
	var _color = "#6AFF0B";
	var _top = 5; // Text position from top in percent
	var _blinkSpeed; // If 0, the text won't blink
	var _blinkVisible = true;
	var _blinkLastTime;


	var _init = function() {
		// HERE Initialization of the layer
	};

	/**
	 * REQUIRED
	 */
	this.draw = function() {
		// Blink handling
		if (_blinkSpeed > 0) {
			var now = new Date().getTime();
			if (now - _blinkLastTime >= _blinkSpeed) {
				_blinkVisible = !_blinkVisible;
				_blinkLastTime = now;
			}
		}

		if (!_blinkVisible) {
			return false;
		}

		// Font styling
		var fontSize = Math.ceil(_viewportDimension.width / 25);

		_context.fillStyle = _color;
		//_context.strokeStyle = _color;
		_context.font = fontSize + "px VT323, monospace";
		_context.textAlign = "center";
		_context.textBaseline = "middle";

		// Draw time text
		_context.fillText(_message, (_viewportDimension.width / 2), (_viewportDimension.height / 100 * _top));
	};

	this.setMessage = function(message) {
		_message = message;
	};

	this.setColor = function(color) {
		_color = color;
	};

	this.setTop = function(top) {
		_top = top;
	};

	this.setBlinkSpeed = function(blinkSpeed) {
		_blinkSpeed = blinkSpeed;
		_blinkVisible = true;
		_blinkLastTime = new Date().getTime();
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