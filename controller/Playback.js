var Playback = function(video) {
	var _video = video;

	// this mirror
	var _this = this;

	// "Loop" functionnality variables
	var _loopActive = false;
	var _loopStart;
	var _loopEnd;
	// TODO _loopSpeed

	// "When" functionnality variables
	var _whenArray = [];
	var _whenPreviousPosition;

	var _init = function() {
		// Initialize progress eventLister
		_video.addEventListener("progress", _progressHandler);
	};

	/**
	 * Called everytime the video "progress" event is fired
	 */
	var _progressHandler = function() {
		var position = _this.getPosition();

		// Loops handling
		_loopProgressHandler(position);

		// "When" handling
		_whenProgressHandler(position);
	};

	/**
	 * Returns the video element object
	 */
	this.getVideo = function() {
		return _video;
	};

	/**
	 * Check if the video is paused
	 * @return {bool} TRUE if the video is paused, FALSE if it's not
	 */
	this.isPaused = function() {
		return _video.paused;
	};

	/**
	 * Check if the video is loading
	 * @retun {bool} TRUE if the video is currently loading, FALSE if it's not
	 */
	this.isLoading = function() {
		// TODO Check if possible
		return false;
	}

	/**
	 * Start playing the video
	 */
	this.play = function(cancelEffect) {
		if (typeof cancelEffect === "undefined") {
			cancelEffect = true;
		}

		_video.play();

		if (cancelEffect) {
			// Reset speed
			_this.resetSpeed();

			// Cancel loop
			_this.unloop();
		}
	};

	/**
	 * Pause the video playback
	 */
	this.pause = function() {
		_video.pause();
	};

	this.stop = function() {
		_this.pause();
		_this.seek(0);
	};

	this.setSpeed = function(speed) {
		_video.playbackRate = speed;
	};

	this.getSpeed = function() {
		return _video.playbackRate;
	};

	this.resetSpeed = function() {
		_this.setSpeed(1);
	}

	/**
	 * Returns video current position
	 * @return {number} Current position (in seconds)
	 */
	this.getPosition = function() {
		// TODO return current position
		return _video.currentTime;
	};

	/**
	 * Move the video to a specific position
	 * @params {number} position Video position (in seconds)
	 */
	this.seek = function(position) {
		// TODO move playback to position
		_video.currentTime = position;
	};

	/**
	 * Loop the video position from a time position to another
	 * If the current position is included in the loop, the video current position is not moved
	 * @params {number} start Loop start position (in seconds)
	 * @params {number} end Loop end position (in seconds)
	 */
	this.loop = function(start, end) {
		// If start is undefined, we use current position
		if (start === undefined) {
			start = _this.getPosition();
		}

		// If start and end are inverted, we put them in the right order
		if (start > end) {
			var temp = start;
			start = end;
			end = temp;
		}

		// Check if the current position is included in the desired loop
		// If not, we move to the beggining of the loop
		var current = _this.getPosition();
		if (current < start || current > end) {
			_this.seek(start);
		}

		if (_this.isPaused()) {
			// We don't use the class' play method because it would 
			_this.play(false);
		}

		// Enable the loop
		_loopActive = true;
		_loopStart = start;
		_loopEnd = end;
	};

	/**
	 * Stop the loop, the playback will continue
	 */
	this.unloop = function() {
		_loopActive = false;
		_loopStart = undefined;
		_loopEnd = undefined;
	}

	/**
	 * Called by the _progressHandler function
	 * Handle loops
	 */
	var _loopProgressHandler = function(position) {
		// Loops handling
		if (_loopActive) {
			if (position > _loopEnd) {
				_this.seek(_loopStart);
			}
		}
	};

	/**
	 * Defines a function that will be called at a specific moment of the video playback
	 * @params {number} position Timed event position (in seconds)
	 * @params {function} callback This function will be called when the video reaches the "position" time
	 */
	this.when = function(position, callback) {
		// If nothing has been planned for this position, create the callback array
		if (typeof _whenArray[position] === "undefined") {
			_whenArray[position] = [];
		}

		// Add the callback
		_whenArray[position].push(callback);
	};

	/**
	 * Called by the _progressHandler function
	 * Handle "when", video timed events
	 */
	var _whenProgressHandler = function(position) {
		if (typeof _whenPreviousPosition !== "undefined") {
			// Going through all the planned events
			for (var whenPosition in _whenArray) {
				// Check if the current "when" has to be executed
				if (whenPosition > _whenPreviousPosition && whenPosition < position) {
					var whens = _whenArray[whenPosition];
					for (var i=0; i < whens.length; i++) {
						// Execution of the function
						whens[i]();
					}
				}
			}
		}

		_whenPreviousPosition = position;
	};

	this.progress = function(callback) {
		_video.addEventListener("progress", callback);
	};

	_init();
}