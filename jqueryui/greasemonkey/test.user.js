// ==UserScript==
// @name            test
// @namespace       test
// @version         1.0
// @include         http://*
// @include         https://*
// @delay 20
// @require         https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @require         https://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/jquery-ui.min.js
// @resource        jQueryUICSS                                 https://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/themes/base/jquery-ui.css
// @resource        ui-bg_flat_0_aaaaaa_40x100.png              https://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/themes/base/images/ui-bg_flat_0_aaaaaa_40x100.png
// @resource        ui-bg_flat_75_ffffff_40x100.png             https://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/themes/base/images/ui-bg_flat_75_ffffff_40x100.png
// @resource        ui-bg_glass_55_fbf9ee_1x400.png             https://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/themes/base/images/ui-bg_glass_55_fbf9ee_1x400.png
// @resource        ui-bg_glass_65_ffffff_1x400.png             https://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/themes/base/images/ui-bg_glass_65_ffffff_1x400.png
// @resource        ui-bg_glass_75_dadada_1x400.png             https://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/themes/base/images/ui-bg_glass_75_dadada_1x400.png
// @resource        ui-bg_glass_75_e6e6e6_1x400.png             https://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/themes/base/images/ui-bg_glass_75_e6e6e6_1x400.png
// @resource        ui-bg_glass_95_fef1ec_1x400.png             https://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/themes/base/images/ui-bg_glass_95_fef1ec_1x400.png
// @resource        ui-bg_highlight-soft_75_cccccc_1x100.png    https://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/themes/base/images/ui-bg_highlight-soft_75_cccccc_1x100.png
// @resource        ui-icons_222222_256x240.png                 https://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/themes/base/images/ui-icons_222222_256x240.png
// @resource        ui-icons_2e83ff_256x240.png                 https://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/themes/base/images/ui-icons_2e83ff_256x240.png
// @resource        ui-icons_454545_256x240.png                 https://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/themes/base/images/ui-icons_454545_256x240.png
// @resource        ui-icons_888888_256x240.png                 https://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/themes/base/images/ui-icons_888888_256x240.png
// @resource        ui-icons_cd0a0a_256x240.png                 https://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/themes/base/images/ui-icons_cd0a0a_256x240.png
// @resource        htmlFragment     https://raw.github.com/greentea039/test/master/jqueryui/greasemonkey/resources/fragment.html
// @run-at          document-end
// ==/UserScript==
					
function appendButton() {
	var div = document.createElement("div");
	div.setAttribute("id", "extensionButton");
	div.setAttribute("class", "ui-state-default ui-corner-all");
	div.style.cssText = "position:absolute; top: 20px; left: 20px; z-index: 999; cursor: pointer;";
	div.innerHTML = '<span style="margin: 3px" class="ui-icon ui-icon-wrench" />';
	document.body.appendChild(div);
	div.addEventListener("click", openDialog);
}

function openDialog(event) {
	var div = document.createElement("div");
	document.body.appendChild(div);
	div.setAttribute("id", "dialog-modal");
	div.setAttribute("title", "Basic modal dialog");
	div.innerHTML = GM_getResourceText("htmlFragment");
	$(div).dialog({
		modal: true,
	});
	$(div).dialog("open");
}

function escapeRegex(value) {
	return value.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
}

function addUIStyle() {
	var resourceNames = [
		"ui-bg_flat_0_aaaaaa_40x100.png",
		"ui-bg_flat_75_ffffff_40x100.png",
		"ui-bg_glass_55_fbf9ee_1x400.png",
		"ui-bg_glass_65_ffffff_1x400.png",
		"ui-bg_glass_75_dadada_1x400.png",
		"ui-bg_glass_75_e6e6e6_1x400.png",
		"ui-bg_glass_95_fef1ec_1x400.png",
		"ui-bg_highlight-soft_75_cccccc_1x100.png",
		"ui-icons_222222_256x240.png",
		"ui-icons_2e83ff_256x240.png",
		"ui-icons_454545_256x240.png",
		"ui-icons_888888_256x240.png",
		"ui-icons_cd0a0a_256x240.png",
	];
	var css = GM_getResourceText("jQueryUICSS")
	for (var i = 0; i < resourceNames.length; i++) {
		var resourceName = resourceNames[i];
		var resourceURL = GM_getResourceURL(resourceName);
		console.debug(resourceName + ": " + resourceURL);
		var regex = new RegExp(escapeRegex("images/" + resourceName), "g");
		css = css.replace(regex, resourceURL);
	}
	GM_addStyle(css);
}

addUIStyle();
appendButton();
