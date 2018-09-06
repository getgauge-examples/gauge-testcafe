/* globals gauge*/

"use strict";
const testControllerHolder = require('./test_controller_holder');
var Selector = require('testcafe').Selector;

var _;

beforeSpec(async function() {
  _ = await testControllerHolder.get();
})

step("Goto Google's search page", async function () {
  await _.navigateTo('http://google.com');
});

step("Search for <query>", async function (query) {
  var input = Selector('#lst-ib').with({ boundTestRun: _ });
  await _.typeText(input, query);
  await _.pressKey("enter");
});

step("First link is <text>", async function(text) {
  var firstLink = Selector('#rso').find('a').with({ boundTestRun: _ });
  await _.expect(firstLink.innerText).contains(text);
});