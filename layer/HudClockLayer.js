var HudClockLayer = function() {
	var _active = false;
	var _viewportDimension;
	var _context;

	// Local variables
	var _time = new Date(); // Javascript Date object
	var _timeStart = new Date().getTime();

	var _fontSize = 2; // In percents of the screen width
	var _fontColor = "#6AFF0B";
	var _displayPosition = {};

	var _init = function() {
		// HERE Initialization of the layer
	};

	this.setFontSize = function(fontSize) {
		_fontSize = fontSize;
	};

	this.setFontColor = function(fontColor) {
		_fontColor = fontColor;
	};

	this.setDisplayPosition = function(position) {
		_displayPosition = position;
	}

	var _resetTimeStart = function() {
		_timeStart = new Date().getTime();
	};

	this.setHours = function(hours) {
		_time.setHours(hours);
		_resetTimeStart();
	};

	this.setMinutes = function(minutes) {
		_time.setMinutes(minutes);
		_resetTimeStart();
	};

	this.setSeconds = function(seconds) {
		_time.setSeconds(seconds);
		_resetTimeStart();
	}

	this.setTime = function(time) {
		var timePieces = time.split(":");

		if (timePieces.length !== 3) {
			return false;
		}

		this.setHours(timePieces[0]);
		this.setMinutes(timePieces[1]);
		this.setSeconds(timePieces[2]);
	};

	var _getTimeString = function(date) {
		var hours = date.getHours();
		var minutes = date.getMinutes();
		var seconds = date.getSeconds();

		var timeString = "";
		timeString += (hours < 10 ? "0" + hours : hours);
		timeString += ":";
		timeString += (minutes < 10 ? "0" + minutes : minutes);
		timeString += ":";
		timeString += (seconds < 10 ? "0" + seconds : seconds);

		return timeString;
	};

	this.getTime = function() {
		// Get ellapsed time since time setting
		var now = new Date().getTime();
		var ellapsed = now - _timeStart;

		var currentTime = new Date(_time.getTime() + ellapsed);
		return _getTimeString(currentTime);
	};

	/**
	 * REQUIRED
	 */
	this.draw = function() {
		// Font size and text position
		var fontSize = _viewportDimension.width / 100 * _fontSize;
		var targetX, targetY;

		// Positionned from left
		if (typeof _displayPosition.left !== "undefined") {
			targetX = _displayPosition.left / 100 * _viewportDimension.width;
			_context.textAlign = "left";
		}
		// Positionned from right
		else if (typeof _displayPosition.right !== "undefined") {
			targetX = _viewportDimension.width - (_displayPosition.right / 100 * _viewportDimension.width);
			_context.textAlign = "right";
		}
		// Horizontally centered
		else {
			targetX = _viewportDimension.width / 2;
			_context.textAlign = "center";
		}
		
		// Positionned from top
		if (typeof _displayPosition.top !== "undefined") {
			targetY = _displayPosition.top / 100 * _viewportDimension.height;
			_context.textBaseline = "top";
		}
		// Positionned from bottom
		else if (typeof _displayPosition.bottom !== "undefined") {
			targetY = _viewportDimension.height - (_displayPosition.bottom / 100 * _viewportDimension.height);
			_context.textBaseline = "bottom";
		}
		// Vertically centered
		else {
			targetY = _viewportDimension.height / 2;
			_context.textBaseline = "middle";
		}

		// Text style
		_context.fillStyle = _fontColor;
		_context.font = fontSize + "px VT323, monospace";

		// Draw time text
		_context.fillText(this.getTime(), targetX, targetY);
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