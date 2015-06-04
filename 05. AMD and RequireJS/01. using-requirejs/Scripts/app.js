/// <reference path="libs/jquery-2.0.3.js" />
/// <reference path="libs/require.js" />
(function () {
	require.config({
		paths: {
			"jquery": "libs/jquery-2.0.3"
		}
	});

	require(["jquery"], function ($) {
		$("html").append("module loaded");
	});
}());