var HudClockLayer = function() {
	var _active = true;
	var _viewportDimension;
	var _context;

	// Local variables
	var _time = new Date(); // Javascript Date object
	var _timeStart = new Date().getTime();

	var _init = function() {
		// HERE Initialization of the layer
	};

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
		// Change the way things are drawn into canvas
		var oldCompositeOperation = _context.globalCompositeOperation;
		_context.globalCompositeOperation = 'lighter';

		// Time styling
		var fontSize = Math.ceil(_viewportDimension.width / 50);
		_context.fillStyle = "#6AFF0B";
		_context.strokeStyle = "#6AFF0B";
		_context.font = fontSize + "px VT323, monospace";
		_context.textAlign = "right";
		_context.textBaseline = "middle";

		// Draw time text
		_context.fillText(this.getTime(), _viewportDimension.width - 20, 20);

		_context.globalCompositeOperation = oldCompositeOperation;
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