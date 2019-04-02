const {Given, When, Then} = require('cucumber');
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