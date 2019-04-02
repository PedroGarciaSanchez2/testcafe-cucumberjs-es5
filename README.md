# Testcafe + cucumberjs

## Pre-requisites
1. Docker installed (but no necesary if you don't want to run the test in a docker container)
2. Nodejs

## Run Scripts
* Keep the folder the structure intact
* Run the different scripts detailed in the package.json
* The tests results will be archived under the folder reports. To get the nice reporter you should run the command `npm run reporter

# Adding tests
All the test are written in Gherkin, the steps are defined in the StepDefinitions files, and the code is interpreted in the page objects.

## Writing Features

    Feature: Github search
        Scenario: Search
            Given github page is displayed
            When user search fralvarop/testcafe-cucumberjs
            Then one result is shown

## Writing Step Definitions
This are the definitions of the feature steps

    ControllerPages pages = new ControllerPages();
    const book = require('../../pages/book');

        Given(/^github page is displayed$/, async function() {
            await book.pages.searchPage.assertSearchBarExists();
        });

        When(/^user search "([^"]*)"$/, async function(toSearch) {
            await book.pages.searchPage.termToSearch(toSearch);
        });

        Then(/^one result is shown$/, async function() {
            await book.pages.searchPage.assertRepoExist();
        });

## Writing Page Object
This are the definitions of the functions used in each step

    const { xpathToSelector } = require('../config/common');
    const book = require('./book');
    const configProperties = require('../config/global');

    //xpaths
    const searchBar = function() { return xpathToSelector('//input[contains(@class, \'search\')]'); };
    const repo = function() { return xpathToSelector('//ul[contains(@class, \'repo-list\')]/li'); };

    exports.search = {
    //functions
        assertSearchBarExists: async function() {
            await testController.expect(searchBar().exists).ok('Search doesn\'t exists or is not displayed')
        },

        termToSearch: async function(toSearch) {
            await testController.typeText(searchBar(), toSearch);
            await testController.pressKey('enter')
        },

        assertRepoExist: async function() {
            await testController.expect(repo().exists).ok('The repo you\'re looking for doesn\'t exists');
        }
    };`

## Book pages
This will allow you to have all the pages object under one file so you don't have to import all the pages object all the time

    const searchPage = require('./searchPO');

    exports.pages = {
        searchPage: searchPage.search
    };

## Execute tests
    test-chrome-report //will run the test and generate a report.json
    test-chrome // will run the test without generating a report.json
    test-chrome-headless-report // will run the test in headless mode and generate a report.json
    test-chrome-slow // will run the test in slow mode, so you can see what's happening

## Execute reporter

If you generated a report.json, then you can use `npm run reporter`. After this you can find a **index.html within** **reports/html-reports**

# Author

Paco Álvaro <fralvarop@gmail.com>

# Acknowledgment

https://github.com/rquellh/testcafe-cucumber