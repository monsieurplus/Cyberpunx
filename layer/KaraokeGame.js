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

	//	Version 1
	//var _alphaArray;
	//	Version 2
	var _flashPeriod;
	var _flashCountdown;

	var _alphaMax;
	var _alphaMin;

	//	Version 1
	//var _alphaThreshold;
	//var _alphaOnClick;
	//var _fadingSpeed;

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

		//	Version 1
		//_alphaArray = [];

		//	Version 2
		_flashPeriod = 40;	
		_flashCountdown = _flashPeriod;

		_alphaMax = 1.0;
		_alphaMin = 0.1;

		//	Version 1
		//_alphaThreshold = 0.2;
		//_alphaOnClick = 0.5;
		//_fadingSpeed = 0.8;

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

		//	Version 1
		//var alphaTemp = 0.0;
		//var alphaIndex = 0;
		//var alphaLength = _alphaArray.length;

		//	Version 2
		_flashCountdown--;


		while (index < length)
		{
			lyrics = _lyricsArray[index];
			tmpWidth = _ratioHeight * _ratioWidth * lyrics.width;

			// Changing opacity before drawing
			if (_prohibArray[index])
			{
				//	Version 1
				//if (alphaIndex < alphaLength)
				//{
					//alphaTemp =  _alphaArray[alphaIndex] - timeSinceLastDraw * _fadingSpeed / 1000;
					//_alphaArray[alphaIndex] = alphaTemp < _alphaMin ? _alphaMin : alphaTemp;

					//_context.globalAlpha = _alphaArray[alphaIndex];
					//alphaIndex++;
				//}

				//	Version 2
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

		//	Version 1
		//var alphaIndex = 0;
		//var alphaTemp;

		while (index < length)
		{
			tmpWidth = _ratioHeight * _ratioWidth * _lyricsArray[index].width;

			if (_prohibArray[index])
			{
				if (x >= lyricsX && x <= lyricsX + tmpWidth && y >= _offsetY && y <= _offsetY + _drawHeight)
				{
					//	Version 1
					//alphaTemp = _alphaArray[alphaIndex] + _alphaOnClick;
					//_alphaArray[alphaIndex] = alphaTemp > _alphaMax ? _alphaMax : alphaTemp;

					//	Version 2
					_prohibArray[index] = false;

					return true;
				}

				//	Version 1
				//alphaIndex++;
			}

			lyricsX += tmpWidth;
			index++;
		}
		
		// If nothing has been hit, return false
		return false;
	};

	this.nextLyrics = function() {

		var length = _prohibArray.length;
		var index = 0;

		while (index < length && !_prohibArray[index])
		{
			index++;
		}

		// Do something
		//if (index < length)	{}

		if (_currentLyricsLine > 0)
		{
			_lyricsArray = _lyricsNextArray;
			_prohibArray = _prohibNextArray;

			_lyricsWidth = _lyricsNextWidth;

			_setMargins();

			//index = 0;
			//_lyricsWidth = 0;
			//while (index < length)
			//{
				//_lyricsWidth += _lyricsArray[index].width;
				console.log(_lyricsWidth);
				//index++;
			//}

		}

		_currentLyricsLine++;
		_loadNextLyrics()
	};


	var _setMargins = function() {

		_ratioWidth = _lyricsWidth * _ratioHeight > _drawWidth ? _drawWidth * 1.0 / (_lyricsWidth * _ratioHeight) : 1.0;
		_offsetX = (_viewportDimension.width - _lyricsWidth * _ratioHeight * _ratioWidth) / 2.0;
	}


	var _loadNextLyrics = function() {

		_lyricsNextWidth = 0;

		//	Version 1
		//_alphaArray = [_alphaMax, _alphaMax, _alphaMax, _alphaMax];

		switch (_currentLyricsLine)
		{
			case 1:
				//	Load line 1

				var lyrics1A = new Image();
				lyrics1A.src = "./resource/image/lyrics/1_a.png";
				_lyricsNextWidth += lyrics1A.width;

				var lyrics1B = new Image();
				lyrics1B.src = "./resource/image/lyrics/1_b_prohib.png";
				_lyricsNextWidth += lyrics1B.width;

				_lyricsNextArray = [lyrics1A, lyrics1B];
				_prohibNextArray = [false, true];

				break;

			case 2:
				//	Load line 2

				var lyrics2A = new Image();
				lyrics2A.src = "./resource/image/lyrics/2_a.png";
				_lyricsNextWidth += lyrics2A.width;

				var lyrics2B = new Image();
				lyrics2B.src = "./resource/image/lyrics/2_b_prohib.png";
				_lyricsNextWidth += lyrics2B.width;

				var lyrics2C = new Image();
				lyrics2C.src = "./resource/image/lyrics/2_c.png";
				_lyricsNextWidth += lyrics2C.width;

				_lyricsNextArray = [lyrics2A, lyrics2B, lyrics2C];
				_prohibNextArray = [false, true, false];

				break;

			case 3:
				//	Load line 3

				var lyrics3A = new Image();
				lyrics3A.src = "./resource/image/lyrics/3_a.png";
				_lyricsNextWidth += lyrics3A.width;

				var lyrics3B = new Image();
				lyrics3B.src = "./resource/image/lyrics/3_b_prohib.png";
				_lyricsNextWidth += lyrics3B.width;

				var lyrics3C = new Image();
				lyrics3C.src = "./resource/image/lyrics/3_c.png";
				_lyricsNextWidth += lyrics3C.width;

				var lyrics3D = new Image();
				lyrics3D.src = "./resource/image/lyrics/3_d_prohib.png";
				_lyricsNextWidth += lyrics3D.width;

				_lyricsNextArray = [lyrics3A, lyrics3B, lyrics3C, lyrics3D];
				_prohibNextArray = [false, true, false, true];

				break;

			case 4:
				//	Load line 4

				var lyrics4A = new Image();
				lyrics4A.src = "./resource/image/lyrics/4_a.png";
				_lyricsNextWidth += lyrics4A.width;

				var lyrics4B = new Image();
				lyrics4B.src = "./resource/image/lyrics/4_b_prohib.png";
				_lyricsNextWidth += lyrics4B.width;

				var lyrics4C = new Image();
				lyrics4C.src = "./resource/image/lyrics/4_c_prohib.png";
				_lyricsNextWidth += lyrics4C.width;

				var lyrics4D = new Image();
				lyrics4D.src = "./resource/image/lyrics/4_d.png";
				_lyricsNextWidth += lyrics4D.width;

				var lyrics4E = new Image();
				lyrics4E.src = "./resource/image/lyrics/4_e_prohib.png";
				_lyricsNextWidth += lyrics4E.width;

				var lyrics4F = new Image();
				lyrics4F.src = "./resource/image/lyrics/4_f.png";
				_lyricsNextWidth+= lyrics4F.width;

				_lyricsNextArray = [lyrics4A, lyrics4B, lyrics4C, lyrics4D, lyrics4E, lyrics4F];
				_prohibNextArray = [false, true, true, false, true, false];

				break;

			case 5:
				//	Load line 5

				var lyrics5A = new Image();
				lyrics5A.src = "./resource/image/lyrics/5_a.png";
				_lyricsNextWidth += lyrics5A.width;

				var lyrics5B = new Image();
				lyrics5B.src = "./resource/image/lyrics/5_b_prohib.png";
				_lyricsNextWidth += lyrics5B.width;

				var lyrics5C = new Image();
				lyrics5C.src = "./resource/image/lyrics/5_c.png";
				_lyricsNextWidth += lyrics5C.width;

				var lyrics5D = new Image();
				lyrics5D.src = "./resource/image/lyrics/5_d_prohib.png";
				_lyricsNextWidth += lyrics5D.width;

				_lyricsNextArray = [lyrics5A, lyrics5B, lyrics5C, lyrics5D];
				_prohibNextArray = [false, true, false, true];

				break;

			case 6:
				//	Load line 6

				var lyrics6A = new Image();
				lyrics6A.src = "./resource/image/lyrics/6_a.png";
				_lyricsNextWidth += lyrics6A.width;

				var lyrics6B = new Image();
				lyrics6B.src = "./resource/image/lyrics/6_b_prohib.png";
				_lyricsNextWidth += lyrics6B.width;

				var lyrics6C = new Image();
				lyrics6C.src = "./resource/image/lyrics/6_c.png";
				_lyricsNextWidth += lyrics6C.width;

				var lyrics6D = new Image();
				lyrics6D.src = "./resource/image/lyrics/6_d_prohib.png";
				_lyricsNextWidth += lyrics6D.width;

				var lyrics6E = new Image();
				lyrics6E.src = "./resource/image/lyrics/6_e.png";
				_lyricsNextWidth += lyrics6E.width;

				var lyrics6F = new Image();
				lyrics6F.src = "./resource/image/lyrics/6_f_prohib.png";
				_lyricsNextWidth += lyrics6F.width;

				_lyricsNextArray = [lyrics6A, lyrics6B, lyrics6C, lyrics6D, lyrics6E, lyrics6F];
				_prohibNextArray = [false, true, false, true, false, true];

				break;

			case 7:
				//	Load line 7

				var lyrics7A = new Image();
				lyrics7A.src = "./resource/image/lyrics/7_a.png";
				_lyricsNextWidth += lyrics7A.width;

				var lyrics7B = new Image();
				lyrics7B.src = "./resource/image/lyrics/7_b_prohib.png";
				_lyricsNextWidth += lyrics7B.width;

				var lyrics7C = new Image();
				lyrics7C.src = "./resource/image/lyrics/7_c.png";
				_lyricsNextWidth += lyrics7C.width;

				var lyrics7D = new Image();
				lyrics7D.src = "./resource/image/lyrics/7_d_prohib.png";
				_lyricsNextWidth += lyrics7D.width;

				_lyricsNextArray = [lyrics7A, lyrics7B, lyrics7C, lyrics7D];
				_prohibNextArray = [false, true, false, true];

				break;

			case 8:
				//	Load line 8

				var lyrics8A = new Image();
				lyrics8A.src = "./resource/image/lyrics/8_a.png";
				_lyricsNextWidth += lyrics8A.width;

				var lyrics8B = new Image();
				lyrics8B.src = "./resource/image/lyrics/8_b_prohib.png";
				_lyricsNextWidth += lyrics8B.width;

				var lyrics8C = new Image();
				lyrics8C.src = "./resource/image/lyrics/8_c_prohib.png";
				_lyricsNextWidth += lyrics8C.width;

				var lyrics8D = new Image();
				lyrics8D.src = "./resource/image/lyrics/8_d.png";
				_lyricsNextWidth += lyrics8D.width;

				var lyrics8E = new Image();
				lyrics8E.src = "./resource/image/lyrics/8_e_prohib.png";
				_lyricsNextWidth += lyrics8E.width;

				var lyrics8F = new Image();
				lyrics8F.src = "./resource/image/lyrics/8_f.png";
				_lyricsNextWidth += lyrics8F.width;

				var lyrics8G = new Image();
				lyrics8G.src = "./resource/image/lyrics/8_g_prohib.png";
				_lyricsNextWidth += lyrics8G.width;

				_lyricsNextArray = [lyrics8A, lyrics8B, lyrics8C, lyrics8D, lyrics8E, lyrics8F, lyrics8G];
				_prohibNextArray = [false, true, true, false, true, false, true];

				break;

			default:
				_lyricsNextArray = [];
				_prohibNextArray = [];
		}
	};


	_init();
};