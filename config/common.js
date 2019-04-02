const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const globals = require('./global');
const {Selector} = require('testcafe');
const xPathToCss  = require('xpath-to-css');

let sharedInfo = new Map();
let client = null;

module.exports = {
    sharedInfo: sharedInfo,

    xpathToSelector: function (xpath) { return Selector(xPathToCss(xpath)).with({boundTestRun: testController}); },

    dbConnection: async function() {
        try {
            client = await MongoClient.connect(globals.mongo_ip.qa, { useNewUrlParser: true });
            console.log("\nConnected to bmaker db");
        } catch (err) {
            console.log(err)
        }
    },

    dbClose: function() {
        client.close();
    },

    deleteUserProgress: async function(username) {
        try {
            let db = client.db("bmaker");
            let query = { username: globals.user[username].username};
            let userId = await db.collection("users").findOne(query);
            await db.collection("progresses").deleteMany({user:ObjectId(userId._id)});
        } catch (e) {
            console.log(e);
        }
    },

    apiAuth: function (client) {
        let apiUrl = 'http://license-qa.bmaker.es/bmaker/licensing/v1/oauth/token';
        let postData = {
            "grant_type": globals.credentials.qa_sta.grantType,
            "client_id": globals.credentials.qa_sta.clientId,
            "client_secret": globals.credentials.qa_sta.clientSecret
        };

        let postHeaders = {
            'Content-Type': 'application/json'
        };

        client.apiPost(apiUrl, postData, postHeaders, null, function (response) {
            console.log(response.body.access_token);
            //var data = JSON.parse(response.body);
            //console.log(data.status);

            client.assert.equal(response.statusCode, 200, "200 OK");
        });
    }
};