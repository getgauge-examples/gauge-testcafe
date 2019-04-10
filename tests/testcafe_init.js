const fs                   = require('fs');
const createTestCafe       = require('testcafe');
const testControllerHolder = require('./test_controller_holder');

function createTestFile () {
  fs.writeFileSync('test.js',
      'import testControllerHolder from "./tests/test_controller_holder.js";\n\n' +

      'fixture("fixture")\n' +

      'test("test", testControllerHolder.capture);');
}

function runTest () {
  var runner = null;

  createTestCafe()
      .then(function (tc) {
          testcafe = tc;
          runner   = tc.createRunner();

          return runner
              .src('./test.js')
              .browsers('chrome')
              .run()
              .catch(function (error) {
                  console.log(error);
              });
      })
      .then(function (report) {
          console.log(report);
      });
}

beforeScenario(function(){
  createTestFile();
  runTest();
});

afterScenario(function(){
  testControllerHolder.free();
  fs.unlinkSync('test.js');
});