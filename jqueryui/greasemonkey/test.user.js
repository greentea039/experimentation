// ==UserScript==
// @name             test
// @namespace        test
// @version          1.0
// @include          http://*
// @delay 20
// @require          https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @require          https://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/jquery-ui.min.js
// @resource         jQueryUICSS  http://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/themes/ui-lightness/jquery-ui.css
// @run-at           document-end
// ==/UserScript==

function appendButton() {
	var div = document.createElement("div");
	div.setAttribute("id", "extensionButton");
	div.setAttribute("class", "ui-state-default ui-corner-all");
	div.style.cssText = "position:absolute; top: 20px; left: 20px; z-index: 9999; cursor: pointer;";
	div.innerHTML = '<span style="margin: 3px" class="ui-icon ui-icon-wrench" />';
	document.body.appendChild(div);
	div.addEventListener("click", openDialog);
}

function openDialog(event) {
	var div = document.createElement("div");
	div.innerHTML = "<h1>Test</h1>";
	$(div).dialog({
		autoOpen: false,
		closeOnEscape: true,
		draggable: true,
		resizable: true,
		height: 400,
		width: 400,
		modal: true,
		position: ["center", "center"],
		title: "test"
	});
	$(div).dialog("open");
}

appendButton();
