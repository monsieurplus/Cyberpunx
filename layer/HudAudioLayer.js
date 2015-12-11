var HudAudioLayer = function() {
	var _active = true;
	var _viewportDimension;
	var _context;

	// Local variables
	var _audioContext;
	var _audioAnalyser;
	var _audioBufferLength;
	var _audioData;

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

	/**
	 * Set the media that will animate the spectrum
	 */
	this.setMedia = function(media) {
		media.addEventListener("canplay", function() {
			source = _audioContext.createMediaElementSource(media);
			source.connect(_audioAnalyser);
			_audioAnalyser.connect(_audioContext.destination);
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

		// Change the way things are drawn into canvas
		var oldCompositeOperation = _context.globalCompositeOperation;
		_context.globalCompositeOperation = 'lighter';

		// Draw the spectrum
		_context.fillStyle = "#6AFF0B";

		// Compute spectrum position
		var topMargin = _viewportDimension.height - 216;
		var spectrumWidth = _viewportDimension.width/6;
		var spectrumBarWidth = Math.floor(spectrumWidth / _audioBufferLength);

		var volume;
		for (var i=0; i < _audioBufferLength; i++) {
			// Compute volume for this frequency (no sound gives 128)
			volume = Math.abs(_audioData[i] - 128);

			// Draw frequency bar
			_context.fillRect(i * spectrumBarWidth + 20, topMargin + 128 - (volume/2), spectrumBarWidth, volume);
		}

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