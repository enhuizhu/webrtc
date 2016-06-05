"use strict";
var fs = require("fs");

module.exports = {
	socket: JSON.parse(String(fs.readFileSync(__dirname + "/../../port.json")))
}