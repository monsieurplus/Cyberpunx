var InvasionGame = function() {
	var _active = true;
	var _viewportDimension;
	var _context;

	// Local variables
	var _brainImage;
	var _brainAscii = [];
	var _brainHealth = 100;
	var _brainImageWidth = 179;
	var _brainImageHeight = 150;
	var _brainWidthPercent = 20;
	var _brainDrawX, _brainDrawY, _brainDrawW, _brainDrawH; // TODO

	var _attackers = [];
	/* {
		x : 0, // in % of screen W
		y : 0, // in % of screen H
		size : 0, // in % of screen W
		speed : 0 // in % of screen W per sec
	} */
	var _attackerPopEnabled = true;
	var _attackerMoveEnable = true;

	var _attackerSpeed = 5;
	var _attackerSize = 5;
	var _attackerDelay = 2000;
	var _attackerLastPop = 0;

	var _failureCallback;

	var _init = function() {
		// HERE Initialization of the layer
		_brainImage = new Image();
		_brainImage.src = "./resource/image/brain.png";
	};

	/**
	 * REQUIRED
	 */
	this.draw = function(timeSinceLastDraw) {
		// Make attackers appear
		_popAttackers();

		// Make attackers move
		_moveAttackers(timeSinceLastDraw);

		// Check if attackers have reached their target
		var successfulAttackers = [];
		for (var i = 0; i < _attackers.length; i++) {
			if (_checkAttackerSuccess(i)) {
				successfulAttackers.push(i);
			}
		}

		// Process change for successful attackers
		for (var i = 0; i < successfulAttackers.length; i++) {
			var attackerIndex = successfulAttackers[i];

			// Remove health from brain
			_processAttackerSuccess();

			// Remove attacker from list
			_removeAttacker(attackerIndex);
		}

		// If the brain's health has reach zero, we call the failure callback
		if (_brainHealth <= 0) {
			if (typeof _failureCallback === "function") {
				_failureCallback();
				_failureCallback = undefined;
			}
		}
		else {
			_refreshAsciiBrain();
		}

		// Draw brain & attackers
		_drawBrain();
		_drawAttackers();
	};

	var _popAttackers = function() {
		if (_attackerPopEnabled === false) {
			return false;
		}

		var now = new Date().getTime();

		if (_attackerLastPop + _attackerDelay < now) {
			// Random pop place
			var popPlace = Math.floor(Math.random() * 4);
			var popX, popY;

			switch (popPlace) {
				// Upper left
				case 0:
					popX = 0;
					popY = Math.random() * 50;
				break;

				// Top left
				case 1:
					popX = Math.random() * 50;
					popY = 0;
				break;

				// Top right
				case 2:
					popX = 50 + Math.random() * 50;
					popY = 0;
				break;

				// Upper right
				case 3:
					popX = 100;
					popY = Math.random() * 50;
				break;
			}
			
			_attackers.push({
				x : popX, y : popY,
				size : _attackerSize,
				speed : _attackerSpeed,
				tick : 0
			});

			_attackerLastPop = now;
		}
	};

	var _removeAttacker = function(attackerIndex) {
		_attackers.splice(attackerIndex, 1);
	};

	var _moveAttackers = function(timeSinceLastDraw) {
		if (_attackerMoveEnable === false) {
			return false;
		}

		var center = {
			x : _viewportDimension.width / 2,
			y : _viewportDimension.height / 2
		};

		for (var i = 0; i < _attackers.length; i++) {
			var attacker = _attackers[i];

			var distance = _viewportDimension.width * 0.01 * timeSinceLastDraw / 1000; // nb of px we have to move the object
			var direction = Math.atan2(50 - attacker.y, 50 - attacker.x);

			attacker.x += Math.cos(direction) * distance;
			attacker.y += Math.sin(direction) * distance;
		}
	};

	var _checkAttackerSuccess = function(attackerIndex) {
		// Compute attacker center - brain center distance
		var attacker = _attackers[attackerIndex];
		var distanceX = 50 - attacker.x;
		var distanceY = 50 - attacker.y;
		var distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

		// Check collision
		return (distance < (attacker.size + _brainWidthPercent / 4));
	};

	var _processAttackerSuccess = function() {
		// Search for a letter to replace
		var replaced = false;
		for (var i = 0; i < _brainAscii.length; i++) {
			for (var j = 0; j < _brainAscii[i].length; j++) {
				var letter = _brainAscii[i][j];
				if (letter !== " " && letter !== "0" && letter != "1") {
					var replacement = [0,1][Math.floor(Math.random() * 2)];
					_brainAscii[i] = _stringReplaceCharAt(_brainAscii[i], j, replacement);
					_brainHealth--;
					replaced = true;
					break;
				}
			}

			if (replaced === true) {
				break;
			}
		}

		// If the brain has been processed without finding a char to replace, then its health is zero	
		if (!replaced) {
			_brainHealth = 0;
		}
	};

	var _checkAttackerClick = function(attackerIndex, clickX, clickY) {
		// Compute attacker center - click distance
		var attacker = _attackers[attackerIndex];
		var distanceX = clickX - _viewportDimension.width * (attacker.x / 100) ;
		var distanceY = clickY - _viewportDimension.height * (attacker.y / 100);
		var attackerRadius = attacker.size / 100 * _viewportDimension.width;

		var distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

		return (distance < attackerRadius / 2);
	};

	var _stringReplaceCharAt = function(string, index, replacement) {
		return string.substr(0, index) + replacement + string.substr(index + 1);
	};

	var _refreshAsciiBrain = function() {

	};
	var _initAsciiBrain = function() {
		var template = [];
		template.push("       XXXXXXXXX");
		template.push("    XXXXXXXXXXXXXXXX");
		template.push(" XXXXXXXXXXXXXXXXXXXXX");
		template.push("XXXXXXXXXXXXXXXXXXXXXXX"); // 23 char wide
		template.push("XXXXXXXXXXXXXXXXXXXXXXX");
		template.push(" XXXXXXXXXXXXXXXXXXXX");
		template.push("   XXXXXXXXXX");
		template.push("      XXXXXXX");
		template.push("       X");

		// Count number of "X"s
		var nbX = 0;
		for (var i = 0; i < template.length; i++) {
			for (var j = 0; j < template[i].length; j++) {
				if (template[i][j] === "X") {
					nbX++;
				}
			}
		}

		_brainHealth = nbX;
		_brainAscii = template;
	};

	var _refreshAsciiBrain = function() {
		var brainMatter = ["2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];

		var nbX = 0;
		for (var i = 0; i < _brainAscii.length; i++) {
			for (var j = 0; j < _brainAscii[i].length; j++) {
				var letter = _brainAscii[i][j];
				if (letter !== " " && letter !== "1" && letter !== "0") {
					nbX++;
					_brainAscii[i] = _stringReplaceCharAt(_brainAscii[i], j, brainMatter[Math.floor(Math.random() * 14)]);
				}
			}
		}
	};

	var _drawBrain = function() {
		// Brain drawing
		/*var drawW = _viewportDimension.width / (100 / _brainWidthPercent);
		var drawH = (drawW * _brainImageHeight) / _brainImageWidth;
		var drawX = Math.floor(_viewportDimension.width / 2 - drawW / 2);
		var drawY = Math.floor(_viewportDimension.height / 2 - drawH / 2);

		_context.drawImage(
			_brainImage,
			drawX, drawY,
			drawW, drawH
		);*/

		// Brain Drawing positions
		var startX = 0;
		var startY = 0;
		var charW = 12;
		var charH = 18;
		var marginW = 2;
		var marginH = 2;

		// Setting dynamic positions
		var maxX = 23; // widest line number of chars
		var maxY = _brainAscii.length;

		charW = Math.ceil(_viewportDimension.width / 100);
		charH = Math.ceil(charW * 1.33);
		marginW = Math.ceil(charW / 5);
		marginH = Math.ceil(charH / 5);

		startX = Math.ceil((_viewportDimension.width - ((maxX * charW + (maxX - 1) * marginW))) / 2);
		startY = Math.ceil((_viewportDimension.height - ((maxY * charH + (maxY - 1) * marginH))) / 2);

		var colorTable = {
			"0" : "white",
			"1" : "white",
			"2" : "yellow",
			"3" : "orange",
			"4" : "red",
			"5" : "magenta",
			"6" : "purple",
			"7" : "blue",
			"8" : "cyan",
			"9" : "green",
			"A" : "yellow",
			"B" : "brown",
			"C" : "grey",
			"D" : "darkblue",
			"E" : "darkred",
			"F" : "darkgreen",
		};

		_context.font = charH + "px bold VT323, monospace";
		_context.textAlign = "left";
		_context.textBaseline = "top";

		for (var i = 0; i < _brainAscii.length; i++) {
			for (var j = 0; j < _brainAscii[i].length; j++) {
				var letter = _brainAscii[i][j];

				if (letter === " ") {
					continue;
				}

				var posX = startX + j * charW + (j - 1) * marginW;
				var posY = startY + i * charH + (i - 1) * marginH;

				_context.fillStyle = colorTable[letter];
				_context.fillText(letter, posX, posY);
			}
		}
	};

	var _drawAttackers = function() {
		for (var i = 0; i < _attackers.length; i++) {
			var attacker = _attackers[i];
			var x = attacker.x * _viewportDimension.width * 0.01;
			var y = attacker.y * _viewportDimension.height * 0.01;
			var size = attacker.size + _viewportDimension.width * 0.01;

			if (attacker.tick) {
				_context.fillStyle = "#6AFF0B";
				attacker.tick = 0;
			}
			else {
				_context.fillStyle = "white";
				attacker.tick = 1;
			}

			_context.beginPath();
			_context.arc(x, y, size, 0, Math.PI * 2, true);
			_context.fill();
			//_context.stroke();
		};
	};

	this.enableAttackerPop = function() {
		_attackerPopEnabled = true;
	};

	this.disableAttackerPop = function() {
		_attackerPopEnabled = false;
	};

	this.enableAttackerMove = function() {
		_attackerMoveEnable = true;
	};

	this.disableAttackerMove = function() {
		_attackerMoveEnable = false;
	};

	this.setAttackerSpeed = function(speed) {
		_attackerSpeed = speed;
	};

	this.setAttackerSize = function(size) {
		_attackerSize = size;
	};

	this.setAttackerDelay = function(delay) {
		_attackerDelay = delay;
	};

	this.setFailureCallback = function(callback) {
		_failureCallback = callback;
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
		// Check if one of the attackers has been hit
		for (var i = 0; i < _attackers.length; i++) {
			if (_checkAttackerClick(i, x, y)) {
				_removeAttacker(i);
			}
		}
		
		// If nothing has been hit, return false
		return false;
	};

	_init();
	_initAsciiBrain();
};