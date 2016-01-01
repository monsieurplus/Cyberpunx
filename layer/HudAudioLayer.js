var HudAudioLayer = function() {
	var _active = true;
	var _viewportDimension;
	var _context;

	// Local variables
	var _audioContext;
	var _audioAnalyser;
	var _audioBufferLength;
	var _audioData;

	var _displayPosition = {};
	var _displayWidth = 20; // In percents of the screen width
	var _displayRatio = 0.5; // Ratio height/width
	var _color = "#6AFF0B";

	var _init = function() {
		// Get the AudioContext
		_audioContext = new (window.AudioContext || window.webkitAudioContext || window.mozAudioContext)();
		
		// Create the Analyser
		_audioAnalyser = _audioContext.createAnalyser();
		_audioAnalyser.fftSize = 128;

		// Prepare audioData array
		_audioBufferLength = _audioAnalyser.frequencyBinCount;
		_audioData = new Uint8Array(_audioBufferLength);
	};

	this.setDisplayWidth = function(width) {
		_displayWidth = width;
	};

	this.setDisplayRatio = function(ratio) {
		_displayRatio = ratio;
	};

	this.setDisplayPosition = function(position) {
		_displayPosition = position;
	};

	this.setColor = function(color) {
		_color = color;
	};

	/**
	 * Set the media that will animate the spectrum
	 */
	this.setMedia = function(media) {
		var sourceCreated = false;

		media.addEventListener("canplay", function() {
			if (sourceCreated === true) {
				return false;
			}

			var source = _audioContext.createMediaElementSource(media);
			source.connect(_audioAnalyser);
			_audioAnalyser.connect(_audioContext.destination);
			sourceCreated = true;
		});
	};

	/**
	 * REQUIRED
	 */
	this.draw = function() {
		_drawSpectrum();
	};

	var _drawSpectrum = function() {
		// Get the audio data
		_audioAnalyser.getByteTimeDomainData(_audioData);

		// Draw the spectrum
		_context.fillStyle = _color;

		// Compute spectrum position
		var spectrumX, spectrumY;
		
		var spectrumW = _viewportDimension.width / 100 * _displayWidth; // Spectrum width
		var spectrumH = spectrumW * _displayRatio;
		var spectrumBarW = Math.ceil(spectrumW / _audioBufferLength); // Width of one bar of the spectrum
		var volumeUnitH = spectrumH / 128; // Height for 1 unit of volume

		// Positionned from left
		if (typeof _displayPosition.left !== "undefined") {
			spectrumX = _displayPosition.left / 100 * _viewportDimension.width;
		}
		// Positionned from right
		else if (typeof _displayPosition.right !== "undefined") {
			spectrumX = _viewportDimension.width - (_displayPosition.right / 100 * _viewportDimension.width) - spectrumW;
		}
		// Horizontally centered
		else {
			spectrumX = _viewportDimension.width / 2 - spectrumW / 2;
		}

		// Positionned from top
		if (typeof _displayPosition.top !== "undefined") {
			spectrumY = _displayPosition.top / 100 * _viewportDimension.height;
		}
		// Positionned from bottom
		else if (typeof _displayPosition.bottom !== "undefined") {
			spectrumY = _viewportDimension.height - (_displayPosition.bottom / 100 * _viewportDimension.height) - spectrumH;
		}
		// Vertically centered
		else {
			spectrumY = _viewportDimension.height / 2 - spectrumH / 2;
		}

		var volume, spectrumBarH;
		for (var i=0; i < _audioBufferLength; i++) {
			// Compute volume for this frequency (no sound gives 128)
			volume = Math.abs(_audioData[i] - 128);
			spectrumBarH = Math.ceil(volume * volumeUnitH);

			// Draw frequency bar
			_context.fillRect(
				spectrumX + i * spectrumBarW,
				spectrumY + (spectrumH - spectrumBarH) / 2,
				spectrumBarW,
				spectrumBarH
			);
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