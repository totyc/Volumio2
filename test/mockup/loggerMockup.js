'use strict';

module.exports = LoggerMockup;
function LoggerMockup() {

}

LoggerMockup.prototype.info = function (text) {
    console.log("---- "+text);
};