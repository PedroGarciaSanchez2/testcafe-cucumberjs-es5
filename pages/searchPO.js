const { xpathToSelector } = require('../config/common');
const book = require('./book');
const configProperties = require('../config/global');

//xpaths
const searchBar = function() { return xpathToSelector('//input[contains(@class, \'search\')]'); };
const repo = function() { return xpathToSelector('//ul[contains(@class, \'repo-list\')]/li'); };

exports.search = {
//functions
    assertSearchBarExists: function() {
        return testController.expect(searchBar().exists).ok('Search doesn\'t exists or is not displayed')
    },

    termToSearch: async function(toSearch) {
        await testController.typeText(searchBar(), toSearch);
        await testController.pressKey('enter')
    },

    assertRepoExist: function() {
        return testController.expect(repo().exists).ok('The repo you\'re looking for doesn\'t exists');
    }
};