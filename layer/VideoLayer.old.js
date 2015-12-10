var VideoLayer = function() {
	var _active = true;
	var _viewportDimension;
	var _context;
	var _gl;

	// Specifics
	var _video;
	var _filter = "none"; // "none" "invert", "brightness", "contrast", "terminator", "predator", "zoom"
	var _filterValue = 1.0;
	var _frame; // Contains the image data we're working on

	var _init = function() {

	};

	this.setVideo = function(video) {
		_video = video;
	}

	this.draw = function() {
		var drawWidth = _viewportDimension.width;
		var drawHeight = _viewportDimension.height;
		var sourceWidth = _video.videoWidth;
		var sourceHeight = _video.videoHeight;
		
		// The "zoom" filter changes the way we draw the video into the canvas
		if (_filter === "zoom") {
			_context.drawImage(_video,
				sourceWidth * 0.25, sourceHeight * 0.25,
				sourceWidth * 0.5, sourceHeight * 0.5,
				0, 0,
				drawWidth, drawHeight
			);
		}
		else {
			_context.drawImage(_video, 0, 0, drawWidth, drawHeight);

			switch (_filter) {
				case "invert":
					_filterInvert();
				break;

				case "terminator":
					_filterTerminator();
				break;

				case "predator":
					_filterPredator();
				break;

				case "brightness":
					_filterBrightness();
				break;

				case "darker":
					_filterDarker();
				break;

				case "contrast":
					//_filterContrast();
					_shaderContrast();
				break;
			}
		}
	};

	var _filterInvert = function() {
		// Get the current frame
		var frame = _context.getImageData(0, 0, _viewportDimension.width, _viewportDimension.height);
		
		// Get number of pixels in the frame
		var frameLength = frame.data.length / 4;

		var rIndex, gIndex, bIndex, aIndex;
		for (var i = 0; i < frameLength; i++) {
			//var r = frame.data[i * 4 + 0]; // Red
			//var g = frame.data[i * 4 + 1]; // Green
			//var b = frame.data[i * 4 + 2]; // Blue
			//var a = frame.data[i * 4 + 3]; // Alpha
			
			rIndex = i * 4;
			gIndex = rIndex + 1;
			bIndex = rIndex + 2;
			
			frame.data[rIndex] = 255 - frame.data[rIndex];
			frame.data[gIndex] = 255 - frame.data[gIndex];
			frame.data[bIndex] = 255 - frame.data[bIndex];
		}

		_context.putImageData(frame, 0, 0);
		frame = null;
	};

	var _filterTerminator = function() {
		// Get the current frame
		var frame = _context.getImageData(0, 0, _viewportDimension.width, _viewportDimension.height);
		
		// Get number of pixels in the frame
		var frameLength = frame.data.length / 4;

		var rIndex, gIndex, bIndex, aIndex;
		var rValue;
		for (var i = 0; i < frameLength; i++) {
			//var r = frame.data[i * 4 + 0]; // Red
			//var g = frame.data[i * 4 + 1]; // Green
			//var b = frame.data[i * 4 + 2]; // Blue
			//var a = frame.data[i * 4 + 3]; // Alpha
			
			rIndex = i * 4;
			gIndex = rIndex + 1;
			bIndex = rIndex + 2;

			rValue = frame.data[rIndex];

			if (rValue < 192) {
				frame.data[gIndex] = 1;
				frame.data[bIndex] = 1;
			}
			else {
				frame.data[gIndex] = (rValue - 192) * 4;
				frame.data[bIndex] = (rValue - 192) * 4;
			}
		}

		_context.putImageData(frame, 0, 0);
	};

	var _filterPredator = function() {
		// Get the current frame
		// TODO Try using a Uint8ClampedArray
		var frame = _context.getImageData(0, 0, _viewportDimension.width, _viewportDimension.height);
		
		// Get number of pixels in the frame
		var frameLength = frame.data.length;

		var lValue;
		for (var i = 0; i < frameLength; i += 4) {
			//var r = frame.data[i * 4 + 0]; // Red
			//var g = frame.data[i * 4 + 1]; // Green
			//var b = frame.data[i * 4 + 2]; // Blue
			//var a = frame.data[i * 4 + 3]; // Alpha
		
			lValue = frame.data[i];

			if (lValue < 32) {
				// Black
				frame.data[i]     = 1;
				frame.data[i + 1] = 1;
				frame.data[i + 2] = 1;
			}
			else if (lValue < 64) {
				// Blue
				frame.data[i]     = 1;
				frame.data[i + 1] = 1;
				frame.data[i + 2] = 255;
			}
			else if (lValue < 96) {
				// Green
				frame.data[i]     = 1;
				frame.data[i + 1] = 255;
				frame.data[i + 2] = 1;
			}
			else if (lValue < 128) {
				// Yellow
				frame.data[i]     = 255;
				frame.data[i + 1] = 255;
				frame.data[i + 2] = 1;
			}
			else if (lValue < 192) {
				// Orange
				frame.data[i]     = 255;
				frame.data[i + 1] = 128;
				frame.data[i + 2] = 1;
			}
			else if (lValue < 224) {
				// Red
				frame.data[i]     = 255;
				frame.data[i + 1] = 1;
				frame.data[i + 2] = 1;
			}
			else {
				// White
				frame.data[i]     = 255;
				frame.data[i + 1] = 255;
				frame.data[i + 2] = 255;
			}
		}

		_context.putImageData(frame, 0, 0);
	};

	var _filterBrightness = function() {
		if (_filterValue == 1) {
			return true;
		}
		var filterValue = _filterValue;

		// Get the current frame
		var frame = _context.getImageData(0, 0, _viewportDimension.width, _viewportDimension.height);
		
		var frameLength = frame.data.length;
		for (var i = 0; i < frameLength; i++) {
			// We skip the alpha values
			if (i%4 === 3) {
				continue;
			}

			frame.data[i] *= filterValue;
		}

		_context.putImageData(frame, 0, 0);
	};

	var _filterContrast = function() {
		if (_filterValue == 1) {
			return true;
		}
		var filterValue = _filterValue;

		// Get the current frame
		var frame = _context.getImageData(0, 0, _viewportDimension.width, _viewportDimension.height);
		
		var frameLength = frame.data.length;
		for (var i = 0; i < frameLength; i++) {
			// We skip the alpha values
			if (i%4 === 3) {
				continue;
			}

			frame.data[i] = 128 + (frame.data[i] - 128) * filterValue;
		}

		_context.putImageData(frame, 0, 0);
	};

	this.setFilter = function(filterName, filterValue) {
		if (typeof filterName === "undefined") {
			_filter = "none";
		}
		else {
			_filter = filterName;
		}

		if (typeof filterValue === "undefined") {
			_filterValue = 1.0;
		}
		else {
			_filterValue = filterValue;
		}
	};

	this.resetFilter = function() {
		_filter = "none";
		_filterValue = 1;
	};

	this.getFilter = function() {
		return {
			'name' : _filter,
			'value' : _filterValue
		};
	};

	this.setViewportDimension = function(dimension) {
		_viewportDimension = dimension;
	};

	this.setContext = function(context) {
		_context = context;
	};

	this.setContextGl = function(contextGl) {
		_gl = contextGl;
	}

	this.isActive = function() {
		return _active;
	};

	this.setActive = function(active) {
		_active = active;
	};
	
	this.click = function(x, y) {
		// TODO Detect if something has been hit, if so, return true
		
		// If nothing has been hit, return false
		return false;
	};

	_init();
};