const util = require('util');
const events = require('events');

function post () {}
util.inherits(post, events.EventEmitter);

post.prototype.command = function (apiUrl, postBody, postHeaders, postAuth, success) {
    let request = require("request");

    let options = {
        uri: apiUrl,
        method: "POST",
        json: postBody
    };

    if (postHeaders !== undefined) {
        options.headers = postHeaders;
    }
    if (postAuth !== undefined) {
        options.auth = postAuth;
    }

    request(options, function (error, response) {
        if (error) {
            console.log(error);
            return;
        }

        success(response);
        this.emit('complete');
    }.bind(this));
};

module.exports = post;