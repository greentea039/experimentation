// ==UserScript==
// @name            test
// @namespace       test
// @version         1.0
// @include         http://*
// @delay 20
// @require         https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @require         https://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/jquery-ui.min.js
// @resource        jQueryUICSS                                 https://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/themes/ui-lightness/jquery-ui.css
// @resource        ui-bg_diagonals-thick_18_b81900_40x40.png   https://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/themes/ui-lightness/images/ui-bg_diagonals-thick_18_b81900_40x40.png
// @resource        ui-bg_diagonals-thick_20_666666_40x40.png   https://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/themes/ui-lightness/images/ui-bg_diagonals-thick_20_666666_40x40.png
// @resource        ui-bg_flat_10_000000_40x100.png             https://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/themes/ui-lightness/images/ui-bg_flat_10_000000_40x100.png
// @resource        ui-bg_glass_100_f6f6f6_1x400.png            https://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/themes/ui-lightness/images/ui-bg_glass_100_f6f6f6_1x400.png
// @resource        ui-bg_glass_100_fdf5ce_1x400.png            https://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/themes/ui-lightness/images/ui-bg_glass_100_fdf5ce_1x400.png
// @resource        ui-bg_glass_65_ffffff_1x400.png             https://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/themes/ui-lightness/images/ui-bg_glass_65_ffffff_1x400.png
// @resource        ui-bg_gloss-wave_35_f6a828_500x100.png      https://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/themes/ui-lightness/images/ui-bg_gloss-wave_35_f6a828_500x100.png
// @resource        ui-bg_highlight-soft_100_eeeeee_1x100.png   https://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/themes/ui-lightness/images/ui-bg_highlight-soft_100_eeeeee_1x100.png
// @resource        ui-bg_highlight-soft_75_ffe45c_1x100.png    https://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/themes/ui-lightness/images/ui-bg_highlight-soft_75_ffe45c_1x100.png
// @resource        ui-icons_222222_256x240.png                 https://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/themes/ui-lightness/images/ui-icons_222222_256x240.png
// @resource        ui-icons_228ef1_256x240.png                 https://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/themes/ui-lightness/images/ui-icons_228ef1_256x240.png
// @resource        ui-icons_ef8c08_256x240.png                 https://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/themes/ui-lightness/images/ui-icons_ef8c08_256x240.png
// @resource        ui-icons_ffd27a_256x240.png                 https://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/themes/ui-lightness/images/ui-icons_ffd27a_256x240.png
// @resource        ui-icons_ffffff_256x240.png                 https://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/themes/ui-lightness/images/ui-icons_ffffff_256x240.png
// @resource        htmlFlagment     https://raw.github.com/greentea039/test/master/jqueryui/greasemonkey/resources/flagment.html
// @run-at          document-end
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
	div.innerHTML = GM_getResourceText("htmlFragment");
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

function addUIStyle() {
	var resourceNames = [
		"ui-bg_diagonals-thick_18_b81900_40x40.png",
		"ui-bg_diagonals-thick_20_666666_40x40.png",
		"ui-bg_flat_10_000000_40x100.png",
		"ui-bg_glass_100_f6f6f6_1x400.png",
		"ui-bg_glass_100_fdf5ce_1x400.png",
		"ui-bg_glass_65_ffffff_1x400.png",
		"ui-bg_gloss-wave_35_f6a828_500x100.png",
		"ui-bg_highlight-soft_100_eeeeee_1x100.png",
		"ui-bg_highlight-soft_75_ffe45c_1x100.png",
		"ui-icons_222222_256x240.png",
		"ui-icons_228ef1_256x240.png",
		"ui-icons_ef8c08_256x240.png",
		"ui-icons_ffd27a_256x240.png",
		"ui-icons_ffffff_256x240.png",
	];
	var css = GM_getResourceText("jQueryUICSS")
	for (var i = 0; i < resourceNames.length; i++) {
		var resourceName = resourceNames[i];
		var resourceURL = GM_getResourceURL(resourceName);
		console.debug(resourceURL);
		css = css.replace("images/" + resourceName, resourceURL);
	}
	GM_addStyle(css);
}

addUIStyle();
appendButton();
