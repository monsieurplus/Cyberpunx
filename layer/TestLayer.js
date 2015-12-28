var TestLayer = function() {
	var _active = true;
	var _viewportDimension;
	var _context;

	// Local variable
	var _image;

	var _init = function() {
		_image = new Image();
		_image.src = "./resource/image/baby_angel_green.png";
	};

	this.draw = function() {
		// Draw the logo
		var drawWidth = 265;
		var drawHeight = 184;
		_context.drawImage(_image, 20, 20, drawWidth, drawHeight);

		// Draw the text
		_context.font = "48px VT323, monospace";
		_context.textAlign = "center";
		_context.fillStyle = "#6AFF0B";
		_context.fillText("PUTTI OMNI-SCIENCE", _viewportDimension.width/2, 100);
	};

	this.setContext = function(context) {
		_context = context;
	};

	this.setViewportDimension = function(dimension) {
		_viewportDimension = dimension;
	};

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