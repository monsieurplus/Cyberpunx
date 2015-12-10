var VideoLayer = function() {
	var _active = true;
	var _viewportDimension;
	var _context;

	// Specifics
	var _container;
	var _video;
	var _filter = "none"; // "none" "invert", "brightness", "contrast", "terminator", "predator", "zoom"
	var _frame; // Contains the image data we're working on

	var _init = function() {
		_container = document.getElementById("video-container");
	};

	var _resize = function() {
		if (!_video || !_video.videoWidth || !_viewportDimension) {
			return false;
		}

		var videoWidth = _video.videoWidth;
		var videoHeight = _video.videoHeight;
		var windowWidth = _viewportDimension.width;
		var windowHeight = _viewportDimension.height;
		var resizeWidth;
		var resizeHeight;
		var resizeMargin;

		var videoRatio = videoWidth / videoHeight;
		var windowRatio = windowWidth / windowHeight;

		_video.style.top  = undefined;
		_video.style.left = undefined;

		if (videoRatio > windowRatio) {
			resizeHeight = windowHeight;
			resizeWidth = Math.floor( (resizeHeight * videoWidth) / videoHeight );
			resizeMargin = - Math.floor( (resizeWidth - windowWidth) / 2 ) + "px";

			_video.width = resizeWidth;
			_video.height = resizeHeight;
			_video.style.left = resizeMargin;
		}
		else {
			resizeWidth = windowWidth;
			resizeHeight = Math.floor( (resizeWidth * videoHeight) / videoWidth );
			resizeMargin = - Math.floor( (resizeHeight - windowHeight) / 2 ) + "px";

			_video.width = resizeWidth;
			_video.height = resizeHeight;
			_video.style.top = resizeMargin;
		}
	};

	this.setVideo = function(video) {
		_video = video;
		_video.id = "video-layer";

		// When the video metadata are loaded
		_video.addEventListener("loadedmetadata", _resize);
		
		_container.appendChild(_video);
		
		_resize();
	}

	this.draw = function() {};

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
		_filter = "none";
	};

	this.getFilter = function() {
		return {
			'name' : _filter
		};
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