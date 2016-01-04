var KaraokeGame = function() {
	var _active = true;
	var _viewportDimension;
	var _context;

	// Local variables
	var _lyricsMatrix;
	var _prohibMatrix;

	var _lyricsWidthArray;
	var _currentLyricsLine;

	var _lyricsArray;
	var _prohibArray;

	var _lyricsNextArray;
	var _prohibNextArray;

	var _lyricsWidth;
	var _lyricsNextWidth;

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


	var _init = function() {

		_currentLyricsLine = 0;

		_lyricsArray = [];
		_prohibArray = [];

		_lyricsWidth = 1;

		_flashPeriod = 40;	
		_flashCountdown = _flashPeriod;

		_alphaMax = 1.0;
		_alphaMin = 0.1;
	};

	/**
	 * REQUIRED
	 */
	//	Version 1 : add parameter timeSinceLastDraw
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
			if (_prohibArray[index])
			{
				if (_flashCountdown == 0)
				{
					_context.globalAlpha = _alphaMax;
					//if (_flashCountdown == 0)
						_flashCountdown = _flashPeriod;
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
		_offsetY = _viewportDimension.height - 3.0 * _drawHeight;

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

			if (_prohibArray[index])
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


	this.startFailureMusic = function() {
		//	Do something
	}


	this.hideLyrics = function() {

		_evaluateResult();

		_lyricsArray = [];
		_prohibArray = [];

		_lyricsWidth = 1;
	}

	this.nextLyrics = function() {

		_evaluateResult();

		if (_currentLyricsLine > 0)
		{
			_lyricsArray = _lyricsNextArray;
			_prohibArray = _prohibNextArray;

			_setLyricsWidth();
			_setMargins();

			console.log(_lyricsWidth);

		}

		_currentLyricsLine++;
		_loadNextLyrics()
	};


	var _evaluateResult = function() {

		var length = _prohibArray.length;
		var index = 0;

		while (index < length && !_prohibArray[index])
		{
			index++;
		}

		if (index < length)
			_success();

		else
			_failure();
	}

	var _success = function() {
		//	Do something
	}

	var _failure = function() {
		// 	Do something
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


	var _loadNextLyrics = function() {

		switch (_currentLyricsLine)
		{
			case 1:
				//	Load line 1

				var lyrics1A = new Image();
				lyrics1A.src = "./resource/image/lyrics/1_a.png";

				var lyrics1B = new Image();
				lyrics1B.src = "./resource/image/lyrics/1_b_prohib.png";

				_lyricsNextArray = [lyrics1A, lyrics1B];
				_prohibNextArray = [false, true];

				//_lyricsNextWidth = lyrics1A.width + lyrics1B.width;

				break;

			case 2:
				//	Load line 2

				var lyrics2A = new Image();
				lyrics2A.src = "./resource/image/lyrics/2_a.png";

				var lyrics2B = new Image();
				lyrics2B.src = "./resource/image/lyrics/2_b_prohib.png";

				var lyrics2C = new Image();
				lyrics2C.src = "./resource/image/lyrics/2_c.png";

				_lyricsNextArray = [lyrics2A, lyrics2B, lyrics2C];
				_prohibNextArray = [false, true, false];

				//_lyricsNextWidth = lyrics2A.width + lyrics2B.width + lyrics2C.width;

				break;

			case 3:
				//	Load line 3

				var lyrics3A = new Image();
				lyrics3A.src = "./resource/image/lyrics/3_a.png";

				var lyrics3B = new Image();
				lyrics3B.src = "./resource/image/lyrics/3_b_prohib.png";

				var lyrics3C = new Image();
				lyrics3C.src = "./resource/image/lyrics/3_c.png";

				var lyrics3D = new Image();
				lyrics3D.src = "./resource/image/lyrics/3_d_prohib.png";

				_lyricsNextArray = [lyrics3A, lyrics3B, lyrics3C, lyrics3D];
				_prohibNextArray = [false, true, false, true];

				//_lyricsNextWidth = lyrics3A.width + lyrics3B.width + lyrics3C.width + lyrics3D.width;

				break;

			case 4:
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

				_lyricsNextArray = [lyrics4A, lyrics4B, lyrics4C, lyrics4D, lyrics4E, lyrics4F];
				_prohibNextArray = [false, true, true, false, true, false];

				//_lyricsNextWidth = lyrics4A.width + lyrics4B.width + lyrics4C.width + lyrics4D.width + lyrics4E.width + lyrics4F.width;

				break;

			case 5:
				//	Load line 5

				var lyrics5A = new Image();
				lyrics5A.src = "./resource/image/lyrics/5_a.png";

				var lyrics5B = new Image();
				lyrics5B.src = "./resource/image/lyrics/5_b_prohib.png";

				var lyrics5C = new Image();
				lyrics5C.src = "./resource/image/lyrics/5_c.png";

				var lyrics5D = new Image();
				lyrics5D.src = "./resource/image/lyrics/5_d_prohib.png";

				_lyricsNextArray = [lyrics5A, lyrics5B, lyrics5C, lyrics5D];
				_prohibNextArray = [false, true, false, true];

				//_lyricsNextWidth = lyrics5A.width + lyrics5B.width + lyrics5C.width + lyrics5D.width;

				break;

			case 6:
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

				_lyricsNextArray = [lyrics6A, lyrics6B, lyrics6C, lyrics6D, lyrics6E, lyrics6F];
				_prohibNextArray = [false, true, false, true, false, true];

				//_lyricsNextWidth = lyrics6A.width + lyrics6B.width + lyrics6C.width + lyrics6D.width + lyrics6E.width + lyrics6F.width;

				break;

			case 7:
				//	Load line 7

				var lyrics7A = new Image();
				lyrics7A.src = "./resource/image/lyrics/7_a.png";

				var lyrics7B = new Image();
				lyrics7B.src = "./resource/image/lyrics/7_b_prohib.png";

				var lyrics7C = new Image();
				lyrics7C.src = "./resource/image/lyrics/7_c.png";

				var lyrics7D = new Image();
				lyrics7D.src = "./resource/image/lyrics/7_d_prohib.png";

				_lyricsNextArray = [lyrics7A, lyrics7B, lyrics7C, lyrics7D];
				_prohibNextArray = [false, true, false, true];

				//_lyricsNextWidth = lyrics7A.width + lyrics7B.width + lyrics7C.width + lyrics7D.width;

				break;

			case 8:
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

				_lyricsNextArray = [lyrics8A, lyrics8B, lyrics8C, lyrics8D, lyrics8E, lyrics8F, lyrics8G];
				_prohibNextArray = [false, true, true, false, true, false, true];

				//_lyricsNextWidth = lyrics8A.width + lyrics8B.width + lyrics8C.width + lyrics8D.width + lyrics8E.width + lyrics8F.width + lyrics8F.width;

				break;

			default:
				_lyricsNextArray = [];
				_prohibNextArray = [];
		}
	};


	_init();
};