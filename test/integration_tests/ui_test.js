// var chai = require('chai');
// var expect = chai.expect;
// var assert = require("assert");
// var jsdom = require('jsdom-global')();
// $ = jQuery = require('jquery');
// _ = require('lodash');

// var mock = require('mock-require');
// mock('src/app_constants/IssuesViewEvents', '../../src/app_constants/IssuesViewEvents'); 
// mock('src/dispatchers/issues_view_dispatcher', '../../src/dispatchers/issues_view_dispatcher');
// mock('src/app_constants/IssuesViewConstants', '../../src/app_constants/IssuesViewConstants'); 

// // 2. To run UI integration tests, run 
// //       a. install java
// //       b. Goto test folder and run 'java -jar selenium-server-standalone-2.53.1.jar'
// //       c. Ensure firefox is installed
// //       d. Run 'npm run start'
// //       e. Run 'node ui_test.js' after navigating to test/integration_tests folder
      
// var IssuesViewStore = require('./../../src/stores/issues_view_store').IssuesViewStore;

// var webdriverio = require('webdriverio');
// var options = {
//     desiredCapabilities: {
//         browserName: 'firefox'
//     }
// };
 
// var host = 'http://localhost:8090';

// var assert = require('assert');

// describe('webdriver.io page', function() {
// this.timeout(15000);
// it('should return "Google"', function (done) { // <- 1
//     webdriverio
//       .remote(options)
//       .init()
//       .url('http://www.google.com/ncr')
//       .title(function(err, res) {
//         console.log('res.value', res.value);
//         console.log('err', err);
//         var title = res.value;
//         assert.equal(title, 'Google', "element present");
//         done(); // <- 2
//       })
//       .end();
//   })
// });