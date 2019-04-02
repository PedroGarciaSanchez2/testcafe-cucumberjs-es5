const util = require('util');
const events = require('events');

function get() { }
util.inherits(get, events.EventEmitter);

get.prototype.command = function (apiUrl, success) {
    let request = require("request");

    request.get(apiUrl, function (error, response) {
        if (error) {
            console.log(error);
            return;
        }

        success(response);
        this.emit('complete');
    }.bind(this));
};

module.exports = get;