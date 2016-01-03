var KaraokeGame = function() {
	var _active = true;
	var _viewportDimension;
	var _context;

	// Local variables
	var _lyricsArray;
	var _prohibArray;
	var _currentIndex;

	var _alphaArray;

	var _alphaMax;
	var _alphaMin;

	//var _alphaThreshold;
	var _alphaOnClick;

	var _fadingSpeed;

	var _drawHeight;
	var _ratio;
	var _baseX;
	var _baseY;


	var _init = function() {

		_lyricsArray = [];
		_prohibArray = [];

		_alphaArray = [];

		_alphaMax = 1.0;
		_alphaMin = 0.2;

		//_alphaThreshold = 0.4;
		_alphaOnClick = 0.5;

		_fadingSpeed = 1.0;

		_currentIndex = 0;
		//_setLyrics(_currentIndex);
	};

	/**
	 * REQUIRED
	 */
	this.draw = function(timeSinceLastDraw) {

		var lyricsIndex = 0;
		var lyricsLength = _lyricsArray.length;

		var lyricsX = _baseX;
		var drawWidth;

		var lyrics;

		var alphaTemp = 0.0;
		var alphaIndex = 0;
		var alphaLength = _alphaArray.length;

		var alphaRef = _context.globalAlpha;

		while (lyricsIndex < lyricsLength)
		{
			lyrics = _lyricsArray[lyricsIndex];
			drawWidth = _ratio * lyrics.width;

			// Changing opacity before drawing
			if (_prohibArray[lyricsIndex])
			{
				if (alphaIndex < alphaLength)
				{
					alphaTemp =  _alphaArray[alphaIndex] - timeSinceLastDraw * _fadingSpeed / 1000;
					_alphaArray[alphaIndex] = alphaTemp < _alphaMin ? _alphaMin : alphaTemp;

					_context.globalAlpha = _alphaArray[alphaIndex];
					alphaIndex++;
				}
			}
			else
				_context.globalAlpha = alphaRef;

			_context.drawImage(
				lyrics,
				lyricsX,
				_baseY,
				drawWidth,
				_drawHeight
			);

			lyricsX += drawWidth;

			lyricsIndex++;
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
		_ratio = _drawHeight * 1.0 / 75.0;

		_baseX = 0;
		_baseY = _viewportDimension.height - 3.0 * _drawHeight;
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

		var lyricsLength = _lyricsArray.length;
		var lyricsIndex = 0;

		var lyricsX = _baseX;
		var drawWidth;

		var alphaIndex = 0;
		var alphaTemp;

		while (lyricsIndex < lyricsLength)
		{
			drawWidth = _ratio * _lyricsArray[lyricsIndex].width;

			if (x >= lyricsX && x <= lyricsX + drawWidth)
				if (y >= _baseY && y <= _baseY + _drawHeight)
				{
					alphaTemp = _alphaArray[alphaIndex] + _alphaOnClick;
					_alphaArray[alphaIndex] = alphaTemp > _alphaMax ? _alphaMax : alphaTemp;

					return true;
				}

			lyricsX += drawWidth;
		}
		
		// If nothing has been hit, return false
		return false;
	};

	this.nextLyrics = function() {
		_currentIndex++;
		_setLyrics(_currentIndex);
	};

	var _setLyrics = function(index) {
		switch(index)
		{
			case 1:
				var lyricsA = new Image();
				lyricsA.src = "./resource/image/lyrics/1_a.png";

				var lyricsB = new Image();
				lyricsB.src = "./resource/image/lyrics/1_b_prohib.png";

				_lyricsArray = [lyricsA, lyricsB];
				_prohibArray = [false, true];

				break;

			case 2:
				var lyricsA = new Image();
				lyricsA.src = "./resource/image/lyrics/2_a.png";

				var lyricsB = new Image();
				lyricsB.src = "./resource/image/lyrics/2_b_prohib.png";

				var lyricsC = new Image();
				lyricsC.src = "./resource/image/lyrics/2_c.png";

				_lyricsArray = [lyricsA, lyricsB, lyricsC];
				_prohibArray = [false, true, false];

				break;

			case 3:
				var lyricsA = new Image();
				lyricsA.src = "./resource/image/lyrics/3_a.png";

				var lyricsB = new Image();
				lyricsB.src = "./resource/image/lyrics/3_b_prohib.png";

				var lyricsC = new Image();
				lyricsC.src = "./resource/image/lyrics/3_c.png";

				var lyricsD = new Image();
				lyricsD.src = "./resource/image/lyrics/3_b_prohib.png";

				_lyricsArray = [lyricsA, lyricsB, lyricsC, lyricsD];
				_prohibArray = [false, true, false, true];

				break;

			case 4:
				var lyricsA = new Image();
				lyricsA.src = "./resource/image/lyrics/4_a.png";

				var lyricsB = new Image();
				lyricsB.src = "./resource/image/lyrics/4_b_prohib.png";

				var lyricsC = new Image();
				lyricsC.src = "./resource/image/lyrics/4_c_prohib.png";

				var lyricsD = new Image();
				lyricsD.src = "./resource/image/lyrics/4_d.png";

				var lyricsE = new Image();
				lyricsE.src = "./resource/image/lyrics/4_e_prohib.png";

				var lyricsF = new Image();
				lyricsF.src = "./resource/image/lyrics/4_f.png";

				_lyricsArray = [lyricsA, lyricsB, lyricsC, lyricsD, lyricsE, lyricsF];
				_prohibArray = [false, true, true, false, true, false];

				break;

			case 5:
				var lyricsA = new Image();
				lyricsA.src = "./resource/image/lyrics/5_a.png";

				var lyricsB = new Image();
				lyricsB.src = "./resource/image/lyrics/5_b_prohib.png";

				var lyricsC = new Image();
				lyricsC.src = "./resource/image/lyrics/5_c.png";

				var lyricsD = new Image();
				lyricsD.src = "./resource/image/lyrics/5_b_prohib.png";

				_lyricsArray = [lyricsA, lyricsB, lyricsC, lyricsD];
				_prohibArray = [false, true, false, true];

				break;

			case 6:
				var lyricsA = new Image();
				lyricsA.src = "./resource/image/lyrics/6_a.png";

				var lyricsB = new Image();
				lyricsB.src = "./resource/image/lyrics/6_b_prohib.png";

				var lyricsC = new Image();
				lyricsC.src = "./resource/image/lyrics/6_c.png";

				var lyricsD = new Image();
				lyricsD.src = "./resource/image/lyrics/6_d_prohib.png";

				var lyricsE = new Image();
				lyricsE.src = "./resource/image/lyrics/6_e.png";

				var lyricsF = new Image();
				lyricsF.src = "./resource/image/lyrics/6_f_prohib.png";

				_lyricsArray = [lyricsA, lyricsB, lyricsC, lyricsD, lyricsE, lyricsF];
				_prohibArray = [false, true, false, true, false, true];

				break;

			case 7:
				var lyricsA = new Image();
				lyricsA.src = "./resource/image/lyrics/7_a.png";

				var lyricsB = new Image();
				lyricsB.src = "./resource/image/lyrics/7_b_prohib.png";

				var lyricsC = new Image();
				lyricsC.src = "./resource/image/lyrics/7_c.png";

				var lyricsD = new Image();
				lyricsD.src = "./resource/image/lyrics/7_b_prohib.png";

				_lyricsArray = [lyricsA, lyricsB, lyricsC, lyricsD];
				_prohibArray = [false, true, false, true];

				break;

			case 8:
				var lyricsA = new Image();
				lyricsA.src = "./resource/image/lyrics/8_a.png";

				var lyricsB = new Image();
				lyricsB.src = "./resource/image/lyrics/8_b_prohib.png";

				var lyricsC = new Image();
				lyricsC.src = "./resource/image/lyrics/8_c_prohib.png";

				var lyricsD = new Image();
				lyricsD.src = "./resource/image/lyrics/8_d.png";

				var lyricsE = new Image();
				lyricsE.src = "./resource/image/lyrics/8_e_prohib.png";

				var lyricsF = new Image();
				lyricsF.src = "./resource/image/lyrics/8_f.png";

				var lyricsG = new Image();
				lyricsG.src = "./resource/image/lyrics/8_g_prohib.png";

				_lyricsArray = [lyricsA, lyricsB, lyricsC, lyricsD, lyricsE, lyricsF, lyricsG];
				_prohibArray = [false, true, true, false, true, false, true];

				break;

			default:
		}

		_alphaArray = [_alphaMax, _alphaMax, _alphaMax, _alphaMax];
	};

	_init();
};