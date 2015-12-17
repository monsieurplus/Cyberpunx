var InvasionGame = function() {
	var _active = true;
	var _viewportDimension;
	var _context;

	// Local variables
	var _brainImage;
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
	var _attackerSpeed = 5;
	var _attackerSize = 5;
	var _attackerDelay = 2000;
	var _attackerLastPop = 0;

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
			_brainHealth -= _attackers[attackerIndex].size;

			// Remove attacker from list
			_removeAttacker(attackerIndex);
		}

		// Draw brain & attackers
		_drawBrain();
		_drawAttackers();
	};

	var _popAttackers = function() {
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
				speed : _attackerSpeed
			});

			_attackerLastPop = now;
		}
	};

	var _removeAttacker = function(attackerIndex) {
		_attackers.splice(attackerIndex, 1);
	};

	var _moveAttackers = function(timeSinceLastDraw) {
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

	var _checkAttackerClick = function(attackerIndex, clickX, clickY) {
		// Compute attacker center - click distance
		var attacker = _attackers[attackerIndex];
		var distanceX = clickX - _viewportDimension.width * (attacker.x / 100) ;
		var distanceY = clickY - _viewportDimension.height * (attacker.y / 100);
		var attackerRadius = attacker.size / 100 * _viewportDimension.width;

		var distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

		return (distance < attackerRadius);
	};

	var _drawBrain = function() {
		// Brain drawing
		var drawW = _viewportDimension.width / (100 / _brainWidthPercent);
		var drawH = (drawW * _brainImageHeight) / _brainImageWidth;
		var drawX = Math.floor(_viewportDimension.width / 2 - drawW / 2);
		var drawY = Math.floor(_viewportDimension.height / 2 - drawH / 2);

		_context.drawImage(
			_brainImage,
			drawX, drawY,
			drawW, drawH
		);
	};

	var _drawAttackers = function() {
		for (var i = 0; i < _attackers.length; i++) {
			var attacker = _attackers[i];
			var x = attacker.x * _viewportDimension.width * 0.01;
			var y = attacker.y * _viewportDimension.height * 0.01;
			var size = attacker.size + _viewportDimension.width * 0.01;

			_context.fillStyle = "red";

			_context.beginPath();
			_context.arc(x, y, size, 0, Math.PI * 2, true);
			_context.fill();
			//_context.stroke();
		};
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
};