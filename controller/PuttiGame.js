var PuttiGame = function() {
	var _level = 0;
	var _interval = false;

	var _successLevel = 10;
	var _successCallback = false;

	var _glitchLayer = false;
	var _glitchParamsBackup = false;

	this.start = function() {
		// Check required params
		if (!_successCallback || !_glitchLayer) {
			false;
		}

		_interval = setInterval(_intervalFunction, 1000);
		
		var glitchParams = _glitchLayer.getParams();
		_glitchParamsBackup = {
			"probability" : glitchParams.probability,
			"quantity" : glitchParams.quantity,
			"width" : glitchParams.width,
			"height" : glitchParams.height
		};
	};

	this.stop = function() {
		clearInterval(_interval);
		_glitchLayer.setParams(_glitchParamsBackup);

		// Clear params
		_glitchLayer = null;
		_successCallback = null;
	};

	var _intervalFunction = function() {
		_level--;
		if (_level < 0) {
			_level = 0;
		}

		_updateGlitch();
		_checkSuccess();
	};

	this.incrementLevel = function() {
		_level++;

		_updateGlitch();
		_checkSuccess();
	};

	this.setSuccessLevel = function(level) {
		_successLevel = level
	}

	this.setSuccessCallback = function(callback) {
		_successCallback = callback;
	};

	this.setGlitchLayer = function(glitchLayer) {
		_glitchLayer = glitchLayer;
	};

	var _updateGlitch = function() {
		// quantity : 0, // Maximum amount of moved area per glitched frame (max 100)
		// probability : 0, // Probability for a frame to be glitched (%)
		// width : 0, // Maximum moved area width (% of the viewport width)
		// height : 0 // Maximum moved area height (% of the viewport height)
		
		_glitchLayer.setParam("probability", _level * 5);
		_glitchLayer.setParam("quantity", _level * 4);
		_glitchLayer.setParam("width", _level * 5);
		_glitchLayer.setParam("height", _level * 5);
	};

	var _checkSuccess = function() {
		if (_level >= _successLevel) {
			_successCallback();
		}
	};
};