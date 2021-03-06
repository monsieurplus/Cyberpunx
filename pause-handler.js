(function() {
	var pausedBeforeBlur = false;
	var hidden = "hidden";

	// Standards:
	if (hidden in document)
		document.addEventListener("visibilitychange", onchange);
	else if ((hidden = "mozHidden") in document)
		document.addEventListener("mozvisibilitychange", onchange);
	else if ((hidden = "webkitHidden") in document)
		document.addEventListener("webkitvisibilitychange", onchange);
	else if ((hidden = "msHidden") in document)
		document.addEventListener("msvisibilitychange", onchange);
	// IE 9 and lower:
	else if ("onfocusin" in document)
		document.onfocusin = document.onfocusout = onchange;
	// All others:
	else
		window.onpageshow = window.onpagehide = window.onfocus = window.onblur = onchange;

	function onchange (evt) {
		var visibility;
		var v = "visible", h = "hidden",
		evtMap = {
			focus:v, focusin:v, pageshow:v, blur:h, focusout:h, pagehide:h
		};

		evt = evt || window.event;
		if (evt.type in evtMap)
			visibility = evtMap[evt.type];
		else
			visibility = this[hidden] ? "hidden" : "visible";

		if (typeof playback !== "undefined") {
			if (visibility === "hidden") {
				pausedBeforeBlur = playback.isPaused();
				playback.pause();

			}
			else {
				if (!pausedBeforeBlur) {
					playback.play();
				}
			}
		}
	}

	// set the initial state (but only if browser supports the Page Visibility API)
	if( document[hidden] !== undefined )
		onchange({type: document[hidden] ? "blur" : "focus"});
})();