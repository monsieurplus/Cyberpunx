/* HUD filter button scripting */
document.addEventListener('DOMContentLoaded', function() {
	/***************/
	/* FILTER MENU */
	/***************/
	var hudFilterLayer = display.getLayer("hudFilter");
	var videoLayer = display.getLayer("video");

	// Toggle a filter and its button
	var toggleFilter = function(buttonName, filterName, filterValue) {
		var isSelected = hudFilterLayer.isButtonSelected(buttonName);

		// Reset buttons and filters
		videoLayer.setFilter("none");
		hudFilterLayer.setAllButtonSelected(false);

		// Activate button and filter
		if (!isSelected) {
			videoLayer.setFilter(filterName, filterValue);
			hudFilterLayer.setButtonSelected(buttonName, true);
		}
	};

	hudFilterLayer.addButton("BRIGHTNESS", function() {
		toggleFilter("BRIGHTNESS", "brightness");
	});	

	hudFilterLayer.addButton("CONTRAST", function() {
		toggleFilter("CONTRAST", "contrast");
	});

	hudFilterLayer.addButton("ZOOM", function() {
		toggleFilter("ZOOM", "zoom");
	});

	hudFilterLayer.addButton("ACID", function() {
		toggleFilter("ACID", "predator");
	});

	hudFilterLayer.addButton("T800", function() {
		toggleFilter("T800", "terminator");
	});

	hudFilterLayer.addButton("INVERT", function() {
		toggleFilter("INVERT", "invert");
	});	

	/************/
	/* END MENU */
	/************/
	display.getLayer("endMenu").addButton("REJOUER", function() {
		playback.seek(0);
		playback.play();
		display.getLayer("endMenu").setActive(false);
	});

	display.getLayer("endMenu").addButton("PARTAGER", function() {
		var fbShareUrl = "https://www.facebook.com/sharer/sharer.php";
		fbShareUrl += "?u=" + encodeURIComponent(window.location.href);
		fbShareUrl += "&t=" + encodeURIComponent("Punk the System - Un court-métrage cyberpunk interactif");

		window.open(fbShareUrl);
	})
});