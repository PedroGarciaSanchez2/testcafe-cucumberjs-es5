const {setWorldConstructor} = require('cucumber');
const testControllerHolder = require('./testControllerHolder');
const base64Img = require('base64-img');

function CustomWorld({attach, parameters}) {

    this.waitForTestController = testControllerHolder.get()
        .then(function(tc) {
            return testController = tc;
        });

    this.attach = attach;

    this.setBrowser = function() {
        if (parameters.browser === undefined) {
            return 'chrome';
        } else {
            return parameters.browser;
        }
    };

    this.setSpeed = function() {
        if (parameters.options === undefined || parameters.options.speed === undefined) {
            return 1;
        } else {
            return parameters.options.speed;
        }
    };
    this.attachScreenshotToReport = function(pathToScreenshot) {
        const imgInBase64 = base64Img.base64Sync(pathToScreenshot);
        const imageConvertForCuc = imgInBase64.substring(imgInBase64.indexOf(',') + 1);
        return attach(imageConvertForCuc, 'image/png');
    };

}

setWorldConstructor(CustomWorld);
