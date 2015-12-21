var HudGlitchLayer = function() {
	var _active = true;
	var _viewportDimension;
	var _context;

	// Local variables
	var _this = this;
	var _glitchParams = {
		quantity : 0, // Maximum amount of moved area per glitched frame (max 100)
		probability : 0, // Probability for a frame to be glitched (%)
		width : 0, // Maximum moved area width (% of the viewport width)
		height : 0 // Maximum moved area height (% of the viewport height)
	};

	var _init = function() {
		// HERE Initialization of the layer
	};

	/**
	 * REQUIRED
	 */
	this.draw = function() {
		if (_glitchParams.probability === 0 || _glitchParams.quantity === 0 || _glitchParams.width === 0 || _glitchParams.height === 0) {
			return false;
		}

		var randomProb = Math.ceil(Math.random() * 100);
		if (randomProb > _glitchParams.probability) {
			return false;
		}

		// HERE Drawing process of the layer
		var glitchNumber = Math.ceil(Math.random() * _glitchParams.quantity);
		for (var i=0; i < glitchNumber; i++) {
			var xSource = Math.random() * _viewportDimension.width;
			var ySource = Math.random() * _viewportDimension.height;
			var wSource = Math.random() * _viewportDimension.width * (_glitchParams.width / 100);
			var hSource = Math.random() * _viewportDimension.height * (_glitchParams.height / 100);
			var xTarget = Math.random() * _viewportDimension.width;
			var yTarget = Math.random() * _viewportDimension.height;

			var extract = _context.getImageData(xSource, ySource, wSource, hSource);
			_context.putImageData(extract, xTarget, yTarget);
		}
	};

	var _checkParamName = function(paramName) {
		return (paramName === "quantity" || paramName === "probability" || paramName === "width" || paramName === "height");
	};

	var _checkParamValue = function(paramValue) {
		return (typeof paramValue === "number" && paramValue >= 0 && paramValue <= 100);
	};

	this.setParam = function(name, value) {
		if (!_checkParamName(name) || !_checkParamValue(value)) {
			return false;
		}

		_glitchParams[name] = value;
	};

	this.setParams = function(params) {
		for (var paramName in params) {
			if (params.hasOwnProperty(paramName)) {
				_this.setParam(paramName, params[paramName]);
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