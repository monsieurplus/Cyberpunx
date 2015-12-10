var Display = function() {
	var _canvas;
	var _context; // Context

	// Layers handling variables
	var _layers = [];
	var _layersIndex = {};

	/**
	 * Returns an object containing the window's size
	 */
	var _getWindowSize = function() {
		return {
			width : Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
			height : Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
		};
	};

	var _init = function() {
		// Get the window size
		var windowSize = _getWindowSize();

		// Create <canvas>
		_canvas = document.createElement("canvas");
		_canvas.width = windowSize.width;
		_canvas.height = windowSize.height;

		// Append the canvas to the page
		document.getElementById("canvas-container").appendChild(_canvas);

		// Keep context
		_context = _canvas.getContext("2d");

		// Listen to the click event
		_canvas.addEventListener("click", _clickHandler);
	};

	/**
	 * Handle the "click" event on the <canvas>
	 * It transmits the click coordinates to all the layers from top to bottom
	 * If a layer intercepts the click, the click is not bubbled to layers below it
	 * @params {object} event The "click" event params
	 */
	var _clickHandler = function(event) {
		// We transmit the click to all layers
		// If one of them returns TRUE, it means it has catched it
		// Then it won't be used on other layers
		var clickCatched = false;
		var layer;
		for (var i=0; i < _layers.length; i++) {
			layer = _layers[i];
			if (layer.isActive()) {
				clickCatched = layer.click(event.offsetX, event.offsetY);

				// If the layer has intercepted the click, we stop transmitting it to other layers below it
				if (clickCatched === true) {
					break;
				}
			}
		}
	};

	/**
	 * Resize the canvas to adapt it to the window size
	 * This method is to be called when the window is resized
	 */
	this.resize = function() {
		// Get the window size
		var windowSize = _getWindowSize();

		// Resize the <canvas>
		_canvas.width = windowSize.width;
		_canvas.height = windowSize.height;

		for (var i=0; i < _layers.length; i++) {
			_layers[i].setViewportDimension(windowSize);
		}
	};

	/**
	 * Erase the surface of the <canvas>
	 */
	this.clear = function() {
		_context.clearRect(0, 0, _canvas.width, _canvas.width);
	};

	/**
	 * Return the <canvas> element
	 * @returns {object} Canvas DOM element
	 */
	this.getCanvas = function() {
		return _canvas;
	};

	/**
	 * Return the 2d context of the <canvas>
	 * @returns {object} CanvasRenderingContext2D instance
	 */
	this.getContext = function() {
		return _context;
	};

	/**
	 * Add a layer to the display.
	 * The layer MUST have some required methods (see DefaultLayer)
	 * @params {string} layerName Name of the layer
	 * @params {object} layerController Instance of the layer class
	 */
	this.addLayer = function(layerName, layerController) {
		var newIndex = _layers.length;

		_layers.push(layerController);
		_layersIndex[layerName] = newIndex;

		layerController.setViewportDimension(_getWindowSize());
		layerController.setContext(_context);
	};

	/**
	 * Return a layer by its index in the _layers array
	 * @params {number} index Index of the required layer in the _layers array
	 */
	var _getLayerByIndex = function(index) {
		return _layers[index];
	};

	/**
	 * Return a layer index in _layers, by its name
	 * @params {string} layerName Name of the required layer
	 */
	var _getLayerIndexByName = function(layerName) {
		return _layersIndex[layerName];
	};

	/**
	 * Return a layer from _layers, by its name
	 * @params {string} layerName Name of the required layer
	 */
	var _getLayerByName = function(layerName) {
		var index = _getLayerIndexByName(layerName);

		if (index === false) {
			return false;
		}

		return _getLayerByIndex(index);
	};

	/**
	 * Return a layer by its name
	 * @params {string} layerName Name of the required layer
	 */
	this.getLayer = function(layerName) {
		return _getLayerByName(layerName);
	};

	/**
	 * Enable a layer (it will become visible and clickable)
	 * @params {string} layerName Name of the layer
	 */
	this.enableLayer = function(layerName) {
		_getLayerByName(layerName).setActive(true);
	};

	/**
	 * Disable a layer (it will not be displayed anymore and will be unclickable)
	 * @params {string} layerName Name of the layer
	 */
	this.disableLayer = function(layerName) {
		_getLayerByName(layerName).setActive(false);
	};

	/**
	 * Draw all the active layers in the <canvas>
	 */
	this.draw = function() {
		var layer;
		for (var i=0; i < _layers.length; i++) {
			layer = _layers[i];
			if (layer.isActive()) {
				layer.draw();
			}
		}
	};

	_init();
};