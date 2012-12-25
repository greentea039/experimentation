// ==UserScript==
// @name            Resource utilization example
// @description     Example of getting CSS texts, CSS images and HTML texts from resources
// @namespace       https://github.com/greentea039/experimentation/tree/master/user-script/resource-utilization-example
// @version         1.0
// @include         http://*/*
// @include         https://*/*
// @require         https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @require         https://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/jquery-ui.min.js
// @resource        jquery-ui.css                               https://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/themes/base/jquery-ui.css
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
// @resource        fragment.html                               https://raw.github.com/greentea039/experimentation/master/user-script/resource-utilization-example/resources/fragment.html
// @run-at          document-end
// ==/UserScript==

var util = {
	isChrome: navigator.userAgent.indexOf("Chrome") >= 0,

	escapeRegex: function (value) {
		return value.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
	},
};

var browserExtension = {
	ImageResourceInfo: function (originalPath, name, resourcePath) {
		this.originalPath = originalPath;
		this.name = name;
		this.resourcePath = resourcePath;
	},
	getResourceURL: function (resourcePath, resourceName) {
		var resourceURL;
		if (util.isChrome) {
			resourceURL = chrome.extension.getURL(resourcePath + resourceName);
		} else {
			resourceURL = GM_getResourceURL(resourceName);
		}
		return resourceURL;
	},
	requestResourceText: function (resoucePath, resourceName, callback) {
		if (util.isChrome) {
			var request = new XMLHttpRequest();
			var resourceURL = browserExtension.getResourceURL(resoucePath, resourceName);
			request.open("GET", resourceURL);
			request.onreadystatechange = function (event) {
				if (request.readyState === 4) {
					if (request.status === 200) {
						if (callback instanceof Function) {
							callback(request.responseText);
						}
					} else {
						console.log("Error loading page, status = " + request.status + ", responseText = [" + request.responseText + "]");
					}
				}
			};
			request.send(null);
		} else {
			if (callback instanceof Function) {
				callback(GM_getResourceText(resourceName));
			}
		}
	},
	addStyle: function (styleText) {
		if (util.isChrome) {
			var styleElement = document.createElement("style");
			styleElement.textContent = styleText;
			document.documentElement.insertBefore(styleElement, null);
		} else {
			GM_addStyle(styleText);
		}
	},
	addStyleFromResource: function (styleResourcePath, styleResouceName, imageResouceInfoArray) {
		browserExtension.requestResourceText(styleResourcePath, styleResouceName, function (styleText) {
			// replace image URLs
			for (var i = 0; i < imageResouceInfoArray.length; i++) {
				var imageResourceName = imageResouceInfoArray[i].name;
				var imageOriginalPath = imageResouceInfoArray[i].originalPath;
				var imageResourcePath = imageResouceInfoArray[i].resourcePath;
				var imageResourceURL = browserExtension.getResourceURL(imageResourcePath, imageResourceName);
				var regex = new RegExp(util.escapeRegex(imageOriginalPath + imageResourceName), "g");
				styleText = styleText.replace(regex, imageResourceURL);
			}
			// add style
			browserExtension.addStyle(styleText);
		});
	},
}

function appendButton() {
	var div = document.createElement("div");
	div.setAttribute("id", "extensionButton");
	div.setAttribute("class", "ui-state-default ui-corner-all ui-icon ui-icon-wrench");
	div.style.cssText = "position: absolute; top: 20px; left: 20px; z-index: 999; cursor: pointer;";
	document.body.appendChild(div);
	div.addEventListener("click", openDialog);
}

function openDialog(event) {
	var div = document.createElement("div");
	document.body.appendChild(div);
	div.setAttribute("id", "dialog-modal");
	div.setAttribute("title", "Basic modal dialog");
	$(div).dialog({
		modal: true,
	});
	$(div).dialog("open");

	browserExtension.requestResourceText("resources/", "fragment.html", function (resourceText) {
		div.innerHTML = resourceText;
	});
}

function addUIStyle() {
	var Obj = browserExtension.ImageResourceInfo;
	var imageResouceInfoArray = [
		new Obj("images/", "ui-bg_flat_0_aaaaaa_40x100.png", "images/"),
		new Obj("images/", "ui-bg_flat_75_ffffff_40x100.png", "images/"),
		new Obj("images/", "ui-bg_glass_55_fbf9ee_1x400.png", "images/"),
		new Obj("images/", "ui-bg_glass_65_ffffff_1x400.png", "images/"),
		new Obj("images/", "ui-bg_glass_75_dadada_1x400.png", "images/"),
		new Obj("images/", "ui-bg_glass_75_e6e6e6_1x400.png", "images/"),
		new Obj("images/", "ui-bg_glass_95_fef1ec_1x400.png", "images/"),
		new Obj("images/", "ui-bg_highlight-soft_75_cccccc_1x100.png", "images/"),
		new Obj("images/", "ui-icons_222222_256x240.png", "images/"),
		new Obj("images/", "ui-icons_2e83ff_256x240.png", "images/"),
		new Obj("images/", "ui-icons_454545_256x240.png", "images/"),
		new Obj("images/", "ui-icons_888888_256x240.png", "images/"),
		new Obj("images/", "ui-icons_cd0a0a_256x240.png", "images/"),
	];
	browserExtension.addStyleFromResource("resources/", "jquery-ui.css", imageResouceInfoArray);
}

addUIStyle();
appendButton();
