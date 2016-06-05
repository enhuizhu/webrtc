"use strict";
var ports = require("../helpers/ports").socket;

describe("test port number", function() {
	it("port should only contains number", function() {
		expect(/\d/.test(ports.port)).toBe(true);
	});
});