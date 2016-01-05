var KaraokeGame = function() {
	var _active = true;
	var _viewportDimension;
	var _context;

	// Local variables
	var _lyricsMatrix;
	var _prohibMatrix;

	var _currentLyricsLine;

	var _lyricsArray;
	var _prohibArray;

	var _lyricsWidth;

	var _flashPeriod;
	var _flashCountdown;

	var _alphaMax;
	var _alphaMin;

	var _drawHeight;
	var _drawWidth;
	var _ratioHeight;
	var _ratioWidth;
	var _offsetX;
	var _offsetY;

	var _successSong;
	var _failureSong;


	var _init = function() {

		_initLyrics();

		_currentLyricsLine = 0;

		_lyricsArray = [];
		_prohibArray = [];

		_lyricsWidth = 1;

		_flashPeriod = 2;
		_flashCountdown = _flashPeriod;

		_alphaMax = 1.0;
		_alphaMin = 0.1;

		_successSong = new Howl({
			urls: ['./resource/sound/success-song.mp3'],
			autoplay: false,
			loop: false,
			volume: 1.0
		});
		_failureSong = new Howl({
			urls: ['./resource/sound/failure-song.mp3'],
			autoplay: false,
			loop: false,
			volume: 1.0
		});

		_successSong.mute();
		_failureSong.mute();
	};

	/**
	 * REQUIRED
	 */
	this.draw = function() {

		var index = 0;
		var length = _lyricsArray.length;

		var lyricsX = _offsetX;
		var tmpWidth;

		var lyrics;

		var alphaRef = _context.globalAlpha;

		_flashCountdown--;


		while (index < length)
		{
			lyrics = _lyricsArray[index];
			tmpWidth = _ratioHeight * _ratioWidth * lyrics.width;


			// Changing opacity before drawing
			if (index < _prohibArray.length && _prohibArray[index])
			{
				if (_flashCountdown == 0)
				{
					_context.globalAlpha = Math.ceil(Math.random() * 3.0) * (_alphaMax - _alphaMin) / 3.0;
				}
				else
					_context.globalAlpha = _alphaMin;
			}
			else
				_context.globalAlpha = alphaRef;


			_context.drawImage(
				lyrics,
				lyricsX,
				_offsetY,
				tmpWidth,
				_drawHeight
			);


			lyricsX += tmpWidth;
			index++;
		}

		if (_flashCountdown == 0)
		{
			_flashCountdown = _flashPeriod;
		}


		// Changing back opacity
		_context.globalAlpha = alphaRef;
	};

	/**
	 * REQUIRED
	 */
	this.setViewportDimension = function(dimension) {
		_viewportDimension = dimension;

		_drawHeight = _viewportDimension.height * 1.0 / 12.0;
		_drawWidth = _viewportDimension.width * 4.0 / 5.0;

		_ratioHeight = _drawHeight * 1.0 / 75.0;
		_offsetY = _viewportDimension.height - 4.0 * _drawHeight;

		_setMargins();
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

		var length = _lyricsArray.length;
		var index = 0;

		var lyricsX = _offsetX;
		var tmpWidth;


		while (index < length)
		{
			tmpWidth = _ratioHeight * _ratioWidth * _lyricsArray[index].width;

			if (index < _prohibArray.length && _prohibArray[index])
			{
				if (x >= lyricsX && x <= lyricsX + tmpWidth && y >= _offsetY && y <= _offsetY + _drawHeight)
				{
					_prohibArray[index] = false;

					return true;
				}
			}

			lyricsX += tmpWidth;
			index++;
		}
		
		// If nothing has been hit, return false
		return false;
	};


	this.startSongs = function() {

		_successSong.play();
		_failureSong.play();

		var volumeRef = playback.getVideo().volume;

		_successSong.volume(volumeRef);
		_failureSong.volume(volumeRef);

		_successSong.unmute();
		_failureSong.mute();
	}


	this.hideLyrics = function() {

		_evaluateResult();

		_lyricsArray = [];
		_prohibArray = [];

		_lyricsWidth = 1;
	}

	this.nextLyrics = function() {

		_lyricsArray = _lyricsMatrix[_currentLyricsLine];
		_prohibArray = _prohibMatrix[_currentLyricsLine];

		_setLyricsWidth();
		_setMargins();

		_currentLyricsLine++;
	};


	var _evaluateResult = function() {

		var length = _prohibArray.length;
		var index = 0;
		var result = true;

		while (index < length && result)
		{
			if (_prohibArray[index])
			{
				result = false;
				break;
			}

			index++;
		}

		if (result)
			_success();

		else
			_failure();
	}

	var _success = function() {

		_successSong.unmute();
		_failureSong.mute();
	}

	var _failure = function() {

		_failureSong.unmute();
		_successSong.mute();
	}


	var _setLyricsWidth = function() {

		var index = 0;
		var length = _lyricsArray.length;

		_lyricsWidth = 0;

		while (index < length)
		{
			_lyricsWidth += _lyricsArray[index].width;
			index++;
		}
	}

	var _setMargins = function() {

		_ratioWidth = _lyricsWidth * _ratioHeight > _drawWidth ? _drawWidth * 1.0 / (_lyricsWidth * _ratioHeight) : 1.0;
		_offsetX = (_viewportDimension.width - _lyricsWidth * _ratioHeight * _ratioWidth) / 2.0;
	}


	var _initLyrics = function() {

		//	Load line 1

		var lyrics1A = new Image();
		lyrics1A.src = "./resource/image/lyrics/1_a.png";

		var lyrics1B = new Image();
		lyrics1B.src = "./resource/image/lyrics/1_b_prohib.png";

		var lyricsLine1 = [lyrics1A, lyrics1B];
		var prohibLine1 = [false, true];


		//	Load line 2

		var lyrics2A = new Image();
		lyrics2A.src = "./resource/image/lyrics/2_a.png";

		var lyrics2B = new Image();
		lyrics2B.src = "./resource/image/lyrics/2_b_prohib.png";

		var lyrics2C = new Image();
		lyrics2C.src = "./resource/image/lyrics/2_c.png";

		var lyricsLine2 = [lyrics2A, lyrics2B, lyrics2C];
		var prohibLine2 = [false, true, false];


		//	Load line 3

		var lyrics3A = new Image();
		lyrics3A.src = "./resource/image/lyrics/3_a.png";

		var lyrics3B = new Image();
		lyrics3B.src = "./resource/image/lyrics/3_b_prohib.png";

		var lyrics3C = new Image();
		lyrics3C.src = "./resource/image/lyrics/3_c.png";

		var lyrics3D = new Image();
		lyrics3D.src = "./resource/image/lyrics/3_d_prohib.png";

		var lyricsLine3 = [lyrics3A, lyrics3B, lyrics3C, lyrics3D];
		var prohibLine3 = [false, true, false, true];


		//	Load line 4

		var lyrics4A = new Image();
		lyrics4A.src = "./resource/image/lyrics/4_a.png";

		var lyrics4B = new Image();
		lyrics4B.src = "./resource/image/lyrics/4_b_prohib.png";

		var lyrics4C = new Image();
		lyrics4C.src = "./resource/image/lyrics/4_c_prohib.png";

		var lyrics4D = new Image();
		lyrics4D.src = "./resource/image/lyrics/4_d.png";

		var lyrics4E = new Image();
		lyrics4E.src = "./resource/image/lyrics/4_e_prohib.png";

		var lyrics4F = new Image();
		lyrics4F.src = "./resource/image/lyrics/4_f.png";

		var lyricsLine4 = [lyrics4A, lyrics4B, lyrics4C, lyrics4D, lyrics4E, lyrics4F];
		var prohibLine4 = [false, true, true, false, true, false];


		//	Load line 5

		var lyrics5A = new Image();
		lyrics5A.src = "./resource/image/lyrics/5_a.png";

		var lyrics5B = new Image();
		lyrics5B.src = "./resource/image/lyrics/5_b_prohib.png";

		var lyrics5C = new Image();
		lyrics5C.src = "./resource/image/lyrics/5_c.png";

		var lyrics5D = new Image();
		lyrics5D.src = "./resource/image/lyrics/5_d_prohib.png";

		var lyricsLine5 = [lyrics5A, lyrics5B, lyrics5C, lyrics5D];
		var prohibLine5 = [false, true, false, true];


		//	Load line 6

		var lyrics6A = new Image();
		lyrics6A.src = "./resource/image/lyrics/6_a.png";

		var lyrics6B = new Image();
		lyrics6B.src = "./resource/image/lyrics/6_b_prohib.png";

		var lyrics6C = new Image();
		lyrics6C.src = "./resource/image/lyrics/6_c.png";

		var lyrics6D = new Image();
		lyrics6D.src = "./resource/image/lyrics/6_d_prohib.png";

		var lyrics6E = new Image();
		lyrics6E.src = "./resource/image/lyrics/6_e.png";

		var lyrics6F = new Image();
		lyrics6F.src = "./resource/image/lyrics/6_f_prohib.png";

		var lyricsLine6 = [lyrics6A, lyrics6B, lyrics6C, lyrics6D, lyrics6E, lyrics6F];
		var prohibLine6 = [false, true, false, true, false, true];


		//	Load line 7

		var lyrics7A = new Image();
		lyrics7A.src = "./resource/image/lyrics/7_a.png";

		var lyrics7B = new Image();
		lyrics7B.src = "./resource/image/lyrics/7_b_prohib.png";

		var lyrics7C = new Image();
		lyrics7C.src = "./resource/image/lyrics/7_c.png";

		var lyrics7D = new Image();
		lyrics7D.src = "./resource/image/lyrics/7_d_prohib.png";

		var lyricsLine7 = [lyrics7A, lyrics7B, lyrics7C, lyrics7D];
		var prohibLine7 = [false, true, false, true];


		//	Load line 8

		var lyrics8A = new Image();
		lyrics8A.src = "./resource/image/lyrics/8_a.png";

		var lyrics8B = new Image();
		lyrics8B.src = "./resource/image/lyrics/8_b_prohib.png";

		var lyrics8C = new Image();
		lyrics8C.src = "./resource/image/lyrics/8_c_prohib.png";

		var lyrics8D = new Image();
		lyrics8D.src = "./resource/image/lyrics/8_d.png";

		var lyrics8E = new Image();
		lyrics8E.src = "./resource/image/lyrics/8_e_prohib.png";

		var lyrics8F = new Image();
		lyrics8F.src = "./resource/image/lyrics/8_f.png";

		var lyrics8G = new Image();
		lyrics8G.src = "./resource/image/lyrics/8_g_prohib.png";

		var lyricsLine8 = [lyrics8A, lyrics8B, lyrics8C, lyrics8D, lyrics8E, lyrics8F, lyrics8G];
		var prohibLine8 = [false, true, true, false, true, false, true];



		// Init matrices

		_lyricsMatrix = [lyricsLine1, lyricsLine2, lyricsLine3, lyricsLine4, lyricsLine5, lyricsLine6, lyricsLine7, lyricsLine8];
		_prohibMatrix = [prohibLine1, prohibLine2, prohibLine3, prohibLine4, prohibLine5, prohibLine6, prohibLine7, prohibLine8];
	};


	_init();
};