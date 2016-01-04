var VideoLayer = function() {
	var _active = false;
	var _viewportDimension;
	var _context;

	// Specifics
	var _container;
	var _video;
	var _filter = "none"; // "none" "invert", "brightness", "contrast", "terminator", "predator", "zoom"

	var _glitchImage; // Current glitch image
	var _glitchStart = -10000;
	var _glitchDurations = [];
	var _glitchParams;

	var _copyVideo = false; // Says if the video image has to be copied to the canvas

	var _init = function() {
		_container = document.getElementById("video-container");
	};

	var _resize = function() {
		var newPosition = _computeVideoPosition();
		
		if (newPosition === false) {
			return false;
		}

		_video.style.top = newPosition.top + "px";
		_video.style.left = newPosition.left + "px";
		_video.width = newPosition.width;
		_video.height = newPosition.height;
	};

	var _computeVideoPosition = function() {
		if (!_video || !_video.videoWidth || !_viewportDimension) {
			return false;
		}

		var videoWidth = _video.videoWidth;
		var videoHeight = _video.videoHeight;
		var windowWidth = _viewportDimension.width;
		var windowHeight = _viewportDimension.height;

		var resize = {
			width : undefined,
			height : undefined,
			top : 0,
			left : 0
		};

		var videoRatio = videoWidth / videoHeight;
		var windowRatio = windowWidth / windowHeight;

		if (videoRatio > windowRatio) {
			resize.height = windowHeight;
			resize.width = Math.floor( (resize.height * videoWidth) / videoHeight );
			resize.left = - Math.floor( (resize.width - windowWidth) / 2 );
		}
		else {
			resize.width = windowWidth;
			resize.height = Math.floor( (resize.width * videoHeight) / videoWidth );
			resize.top = - Math.floor( (resize.height - windowHeight) / 2 );
		}

		return resize;
	};

	this.setVideo = function(video) {
		_video = video;
		_video.id = "video-layer";

		// When the video metadata are loaded
		_video.addEventListener("loadedmetadata", _resize);
		
		_container.appendChild(_video);
		
		_resize();
	};

	var _resetGlitch = function() {
		_glitchImage = undefined;
		_glitchStart = 0;
		_glitchDurations = [];
	};

	var _drawVideo = function() {
		var newPosition = _computeVideoPosition();
		_context.drawImage(_video, newPosition.left, newPosition.top, newPosition.width, newPosition.height);
	};

	var _createGlitchImage = function(params) {
		// Draw the current video frame to the canvas
		_drawVideo();

		// Extract the current video frame from the canvas
		var currentFrame = _context.getImageData(0, 0, _viewportDimension.width, _viewportDimension.height); 

		// Launch glitch creation
		glitch(currentFrame, params, function(glitchImage) {
			_glitchImage = glitchImage;
		});

		_glitchStart = new Date().getTime();
	};

	var _checkGlitch = function() {
		if (_glitchDurations.length === 0) {
			return false;
		}

		// If there is a scheduled glitch but none displayed
		if (!_glitchImage) {
			// Create the first glitch
			_createGlitchImage(_glitchParams);
		}
		else {
			// The current glitch time is elapsed
			var now = new Date().getTime();
			if (now > (_glitchStart + _glitchDurations[0])) {
				// Remove the duration of the first glitch (it is over)
				_glitchDurations.shift();

				// Create the next glitched image
				if (_glitchDurations.length > 0) {
					_createGlitchImage(_glitchParams);
				}
				else {
					_resetGlitch();
				}
			}
		}
	};

	this.addGlitch = function(params, duration) {
		_glitchParams = params
		_glitchDurations.push(duration);
	};

	this.addGlitches = function(params, durations) {
		_glitchParams = params
		_glitchDurations.concat(durations);
	};

	this.resetGlitches = function() {
		_resetGlitch();
	};

	this.draw = function() {
		_checkGlitch();
		if (_glitchImage) {
			_context.putImageData(_glitchImage, 0, 0);
		}
		else {
			if (_copyVideo) {
				_drawVideo();
			}
		}
	};

	this.setFilter = function(filterName) {
		if (typeof filterName === "undefined") {
			_filter = "none";
		}
		else {
			_filter = filterName;
		}

		_container.className = "filter-" + filterName;
	};

	this.resetFilter = function() {
		this.setFilter("none");
	};

	this.getFilter = function() {
		return {
			'name' : _filter
		};
	};

	this.enableVideoCopy = function() {
		_copyVideo = true;
	};

	this.disableVideoCopy = function() {
		_copyVideo = false;
	};

	this.setViewportDimension = function(dimension) {
		_viewportDimension = dimension;
		_resize();
	};

	this.setContext = function(context) {
		_context = context;
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