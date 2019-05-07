const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const globals = require('./global');
const {Selector} = require('testcafe');
const xPathToCss  = require('xpath-to-css');

let sharedInfo = new Map();
let client = null;

module.exports = {
    sharedInfo: sharedInfo,

    xpathToSelector: function (xpath) { return Selector(xPathToCss(xpath)).with({boundTestRun: testController}); }
};