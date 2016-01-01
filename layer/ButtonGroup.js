// Displays a group of buttons (up to 6 buttons)
var ButtonGroup = function() {
	var _active = false;
	var _viewportDimension;
	var _context;

	// Local variables
	var _buttons = [];

	var _displayPosition = {};
	var _displayWidth = 50;
	var _displayRatio = 0.5;
	var _marginWidth = 1;

	var _init = function() {
		// HERE Initialization of the layer
	};

	/**
	 * REQUIRED
	 */
	this.draw = function() {
		for (var i=0; i < _buttons.length; i++) {
			var button = _buttons[i];

			_drawButton(
				button.name,
				button.x,
				button.y,
				button.width,
				button.height,
				Math.ceil(button.width / 100), // border
				Math.ceil(button.height / 1.5), // fontSize
				button.selected
			);
		}
	};

 	/**
 	 * Draw a button
 	 * @params {string} name     Name of the button (this will be displayed in it)
 	 * @params {number} x        Horizontal position of the button (in pixels)
 	 * @params {number} y        Vertical position of the button (in pixels)
 	 * @params {number} width    Width of the button (in pixels)
 	 * @params {number} height   Height of the button (in pixels)
 	 * @params {number} border   Border width of the button (in pixels)
 	 * @params {number} fontSize Height of the button name (in pixels)
 	 * @params {bool}   selected Selection status of the button
 	 */
	var _drawButton = function(name, x, y, width, height, border, fontSize, selected) {
		if (typeof name === "undefined") {
			return false;
		}

		// Button color
		_context.fillStyle = "#6AFF0B";
		_context.strokeStyle = "#6AFF0B";

		if (selected) {
			border *= 2;
		}

		// Draw top border
		_context.fillRect(x, y, width, border);

		// Draw bottom border
		_context.fillRect(x, (y + height - border), width, border);

		// Draw left border
		_context.fillRect(x, (y + border), border, (height - border * 2));

		// Draw right border
		_context.fillRect((x + width - border), (y + border), border, (height - border * 2));

		// Draw the button text
		_context.font = fontSize + "px VT323, monospace";
		_context.textAlign = "center";
		_context.textBaseline = "middle";

		if (selected === true) {
			_context.strokeText(name, (x + width/2), (y + height/2));
		}
		else {
			_context.fillText(name, (x + width/2), (y + height/2));
		}
	};

	this.setDisplayPosition = function(position) {
		_displayPosition = position;
	};

	this.setDisplayWidth = function(width) {
		_displayWidth = width;
	};

	this.setDisplayRatio = function(ratio) {
		_displayRatio = ratio;
	};

	this.setMarginWidth = function(margin) {
		_marginWidth = margin;
	};

	/**
	 * Computes the buttons positions considering the current viewport dimension
	 * This is only called on _init and when the viewport is resized
	 */
	var _computeButtonLayout = function() {
		// Button zone positioning
		var buttonZoneW = _viewportDimension.width / 100 * _displayWidth;
		var buttonZoneH = buttonZoneW * _displayRatio;
		var buttonZoneX, buttonZoneY;

		// Positionned from left
		if (typeof _displayPosition.left !== "undefined") {
			buttonZoneX = _displayPosition.left / 100 * _viewportDimension.width;
		}
		// Positionned from right
		else if (typeof _displayPosition.right !== "undefined") {
			buttonZoneX = _viewportDimension.width - (_displayPosition.right / 100 * _viewportDimension.width) - buttonZoneW;
		}
		// Horizontally centered
		else {
			buttonZoneX = _viewportDimension.width / 2 - buttonZoneW / 2;
		}

		// Positionned from top
		if (typeof _displayPosition.top !== "undefined") {
			buttonZoneY = _displayPosition.top / 100 * _viewportDimension.height;
		}
		// Positionned from bottom
		else if (typeof _displayPosition.bottom !== "undefined") {
			buttonZoneY = _viewportDimension.height - (_displayPosition.bottom / 100 * _viewportDimension.height) - buttonZoneH;
		}
		// Vertically centered
		else {
			buttonZoneY = _viewportDimension.height / 2 - buttonZoneH / 2;
		}

		// Button dimension computing
		var buttonMargin = _viewportDimension.width / 100 * _marginWidth;
		var buttonWidth = Math.floor((buttonZoneW - buttonMargin * 2) / 3);
		var buttonHeight = Math.floor(buttonWidth / 4);

		// Buttons positioning
		for (var i=0; i < _buttons.length; i++) {
			var button = _buttons[i];

			button.width = buttonWidth;
			button.height = buttonHeight;

			var buttonLayout = _buttons.length + "_" + i;

			// Buttons X
			switch (buttonLayout) {
				// Centered button
				case "1_0":
					button.x = buttonZoneX + Math.floor((buttonZoneW - buttonWidth) / 2);
				break;

				// Two buttons row : first  one
				case "2_0":
				case "4_0":
				case "4_2":
				case "5_0":
					button.x = buttonZoneX + Math.floor((buttonZoneW - buttonWidth * 2 - buttonMargin) / 2);
				break;

				// Two buttons row : second  one
				case "2_1":
				case "4_1":
				case "4_3":
				case "5_1":
					button.x = buttonZoneX + Math.floor((buttonZoneW - buttonWidth * 2 - buttonMargin) / 2) + buttonWidth + buttonMargin;
				break;

				// Three buttons row : first one
				case "3_0":
				case "5_2":
				case "6_0":
				case "6_3":
					button.x = buttonZoneX + Math.floor((buttonZoneW - buttonWidth * 3 - buttonMargin * 2) / 2);
				break;

				// Three buttons row : second one
				case "3_1":
				case "5_3":
				case "6_1":
				case "6_4":
					button.x = buttonZoneX + Math.floor((buttonZoneW - buttonWidth * 3 - buttonMargin * 2) / 2) + buttonWidth + buttonMargin;
				break;

				// Three buttons row : third one
				case "3_2":
				case "5_4":
				case "6_2":
				case "6_5":
					button.x = Math.floor(buttonZoneX + (buttonZoneW - (buttonWidth * 3 + buttonMargin * 2)) / 2) + buttonWidth * 2 + buttonMargin * 2;
				break;
			}

			// Buttons Y
			switch (buttonLayout) {
				// One row
				case "1_0":
				case "2_0":
				case "2_1":
				case "3_0":
				case "3_1":
				case "3_2":
					button.y = buttonZoneY + Math.floor((buttonZoneH - buttonHeight) /2);
				break;

				// Two rows : first one
				case "4_0":
				case "4_1":
				case "5_0":
				case "5_1":
				case "6_0":
				case "6_1":
				case "6_2":
					button.y = buttonZoneY + Math.floor((buttonZoneH - buttonHeight * 2 - buttonMargin) / 2);
				break;

				// Two rows : second one
				case "4_2":
				case "4_3":
				case "5_2":
				case "5_3":
				case "5_4":
				case "6_3":
				case "6_4":
				case "6_5":
					button.y = buttonZoneY + Math.floor((buttonZoneH - buttonHeight * 2 - buttonMargin) / 2) + buttonHeight + buttonMargin;
				break;
			}

			_buttons[i] = button;
		}
	};

	/**
	 * Add a button to the filter list
	 * @params {string} name Button name, this is what will be displayed inside the button
	 * @params {function} callback A function called when the button is clicked
	 */
	this.addButton = function(name, callback) {
		_buttons.push({
			name : name,
			callback : callback,
			selected : false
		});

		_computeButtonLayout();
	};

	/**
	 * Return a button object by its index
	 * @params {string} name Button name, this is what is displayed inside the button
	 */
	var _getButtonIndexByName = function(name) {
		for (var i=0; i < _buttons.length; i++) {
			if (_buttons[i].name === name) {
				return i;
			}
		}

		return false;
	};

	/**
	 * Check if a button is currently selected
	 * @params {string} name Button name, this is what is displayed inside the button
	 */
	this.isButtonSelected = function(name) {
		var index = _getButtonIndexByName(name);

		if (index === false) {
			return undefined;
		}

		return _buttons[index].selected;
	};

	/**
	 * Define if a button is selected
	 * @params {string} name Button name, this is what is displayed inside the button
	 * @params {bool} selected If TRUE, the button will be selected, else it will not
	 */
	this.setButtonSelected = function(name, selected) {
		var index = _getButtonIndexByName(name);

		if (index === false) {
			return false;
		}

		_buttons[index].selected = selected;
	};

	/**
	 * Define if all buttons selection status
	 * @params {bool} selected If TRUE, the buttons will be selected, else they will not
	 */
	this.setAllButtonSelected = function(selected) {
		for (var i=0; i < _buttons.length; i++) {
			_buttons[i].selected = selected;
		}
	}

	/**
	 * REQUIRED
	 */
	this.setViewportDimension = function(dimension) {
		_viewportDimension = dimension;

		// If the viewport dimension changes, we re-compute the buttons layout
		_computeButtonLayout();
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
		// Detect if one button has been clicked
		// Then launch this button callback
		for (var i=0; i < _buttons.length; i++) {
			// If the click is inside a button
			if (_checkButtonHit(i, x, y)) {
				if (typeof _buttons[i].callback === "function") {
					_buttons[i].callback();
				}
			}
		}

		// If nothing has been hit, return false
		return false;
	};

	/**
	 * Check if a position (x,y) is inside a specific button
	 * @params {number} index  Index of the button to check
	 * @params {number} clickX Horizontal coordinate of the click
	 * @params {number} clickY Vertical coordinate of the click
	 */
	var _checkButtonHit = function(index, clickX, clickY) {
		var button = _buttons[index];
		return (
			clickX > button.x &&
			clickX < (button.x + button.width) &&
			clickY > button.y &&
			clickY < (button.y + button.height)
		);
	};

	_init();
};