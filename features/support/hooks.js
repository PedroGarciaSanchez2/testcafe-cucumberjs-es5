const fs                    = require('fs');
const createTestCafe        = require('testcafe');
const testControllerHolder  = require('./testControllerHolder');
const {AfterAll, setDefaultTimeout, Before, After, Status} = require('cucumber');
const errorHandling         = require('./errorHandling');
const TIMEOUT               = 60000;
const configProperties      = require('../../config/global');

let isTestCafeError = false;
let attachScreenshotToReport = null;
let cafeRunner = null;
let n = 0;

function createTestFile() {
    fs.writeFileSync('test.js',
        'import errorHandling from "./features/support/errorHandling.js";\n' +
        'import testControllerHolder from "./features/support/testControllerHolder.js";\n\n' +

        'fixture("fixture")\n' +

        'test\n' +
        '("test", testControllerHolder.capture)')
}

function runTest(iteration, browser, speed) {
    createTestCafe('localhost', 1338 + iteration, 1339 + iteration)
        .then(function(tc) {
            cafeRunner = tc;
            const runner = tc.createRunner();
            return runner
                .src('./test.js')
                .screenshots('reports/screenshots/', true)
                .browsers(browser)
                .run({
                    skipJsErrors: true,
                    assertionTimeout: 10000,
                    speed: speed
                })
                .catch(function(error) {
                    console.error(error);
                });
        })
        .then(function(report) {
        });
}


setDefaultTimeout(TIMEOUT);

Before(function() {
    runTest(n, this.setBrowser(), this.setSpeed());
    createTestFile();
    n += 2;
    return this.waitForTestController.then(async function(testController) {
        await testController.navigateTo(configProperties.url);
        return testController.resizeWindow(1360, 768);
    });

});

After(function() {
    fs.unlinkSync('test.js');
    testControllerHolder.free();
});

After(async function(testCase) {
    const world = this;
    if (testCase.result.status === Status.FAILED) {
        isTestCafeError = true;
        attachScreenshotToReport = world.attachScreenshotToReport;
        errorHandling.addErrorToController();
        await errorHandling.ifErrorTakeScreenshot(testController)
    }
});

AfterAll(function() {
    let intervalId = null;

    function waitForTestCafe() {
        intervalId = setInterval(checkLastResponse, 500);
    }

    function checkLastResponse() {
        if (testController.testRun.lastDriverStatusResponse === 'test-done-confirmation') {
            cafeRunner.close();
            process.exit();
            clearInterval(intervalId);
        }
    }

    waitForTestCafe();
});

const getIsTestCafeError = function() {
    return isTestCafeError;
};

const getAttachScreenshotToReport = function(path) {
    return attachScreenshotToReport(path);
};

exports.getIsTestCafeError = getIsTestCafeError;
exports.getAttachScreenshotToReport = getAttachScreenshotToReport;
