var InvasionGame = function() {
	var _active = false;
	var _viewportDimension;
	var _context;

	// Local variables
	var _brainAscii = [];
	var _brainHealth;
	var _brainWidth;
	//var _brainDrawX, _brainDrawY, _brainDrawW, _brainDrawH; // TODO

	var _attackers = [];
	/* {
		x : 0, // in % of screen W
		y : 0, // in % of screen H
		size : 0, // in % of screen W
		speed : 0, // in % of screen W per sec
		strenght : 0 // number of HP removed by this attacker
		tick : 0/1 // used for the blinking effect
	} */
	var _attackerPopEnabled = true;
	var _attackerMoveEnable = true;

	var _attackerSpeed = 5;
	var _attackerSize = 5;
	var _attackerStrength = 1;
	var _attackerColor = "#6AFF0B";
	var _attackerDelay = 2000;
	var _attackerLastPop = 0;

	var _failureCallback;

	var _init = function() {
		// HERE Initialization of the layer
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
			_processAttackerSuccess(i);

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
			var popX = Math.random() * 100;
			var popY = Math.random() * 100;

			switch (popPlace) {
				// Top
				case 0:
					popY = 0
				break;

				// Right
				case 1:
					popX = 100;
				break;

				// Bottom
				case 2:
					popY = 100;
				break;

				// Left
				case 3:
					popX = 0;
				break;
			}
			
			_attackers.push({
				x : popX, y : popY,
				size : _attackerSize,
				speed : _attackerSpeed,
				strength : _attackerStrength,
				color : _attackerColor,
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

			// Sinus modificator
			var now = new Date().getTime();
			attacker.x += Math.sin(direction) * Math.sin(now/100) * 0.5;
			attacker.y += Math.cos(direction) * Math.sin(now/100) * 0.5;
		}
	};

	var _checkAttackerSuccess = function(attackerIndex) {
		// Compute attacker center - brain center distance
		var attacker = _attackers[attackerIndex];
		var distanceX = 50 - attacker.x;
		var distanceY = 50 - attacker.y;
		var distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
		var brainWidthPercent = (_brainWidth / _viewportDimension.width) * 100;

		// Check collision
		return (distance < (attacker.size + brainWidthPercent / 4));
	};

	var _processAttackerSuccess = function(index) {
		var attacker = _attackers[index];

		// Search for a letter to replace
		//var replaced = false;
		for (var i = 0; i < _brainAscii.length; i++) {
			for (var j = 0; j < _brainAscii[i].length; j++) {
				var letter = _brainAscii[i][j];

				// Check is the char can be replaced
				if (letter !== " " && letter !== "0" && letter != "1") {
					// Replace the char by "0" or "1"
					var replacement = [0,1][Math.floor(Math.random() * 2)];
					_brainAscii[i] = _stringReplaceCharAt(_brainAscii[i], j, replacement);

					// Brain HP and attacker strength decreased
					_brainHealth--;
					attacker.strength--;

					if (attacker.strength <= 0) {
						break;
					}
				}
			}

			if (attacker.strength <= 0) {
				break;
			}
		}

		// If the brain has been processed without finding a char to replace, then its health is zero	
		if (attacker.strength > 0) {
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

		// Register the brain's width
		_brainWidth = maxX * charW + (maxX - 1) * marginW;

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
				_context.fillStyle = attacker.color;
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

	this.setAttackerStrength = function(strength) {
		_attackerStrength = strength;
	};

	this.setAttackerDelay = function(delay) {
		_attackerDelay = delay;
	};

	this.setAttackerColor = function(color) {
		_attackerColor = color;
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