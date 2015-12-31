var KaraokeGame = function() {
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
		// HERE Drawing process of the layer
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