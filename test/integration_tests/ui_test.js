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

// 2. To run UI integration tests, run 
//       a. install java
//       b. Goto test folder and run 'java -jar selenium-server-standalone-2.53.1.jar'
//       c. Ensure firefox is installed
//       d. Run 'npm run start'
//       e. Run 'node ui_test.js' after navigating to test/integration_tests folder
      
// var IssuesViewStore = require('./../../src/stores/issues_view_store').IssuesViewStore;

// var webdriverio = require('webdriverio');
// var options = {
//     desiredCapabilities: {
//         browserName: 'firefox'
//     }
// };
 
// var host = 'http://localhost:8090';
// // webdriverio
// //     .remote(options)
// //     .init()
// //     .url(host)
// //     .getTitle().then(function(title) {
// //         console.log('Title was: ' + title);
// //     })
// //     .end();

// var assert = require('assert');

// describe('webdriver.io page', function() {
//     it('should have the right title - the fancy generator way', function () {
//         // browser.url('http://webdriver.io');
//         // var title = browser.getTitle();
//         // assert.equal(title, 'WebdriverIO - Selenium 2.0 javascript bindings for nodejs');

//         webdriverio
//             .remote(options)
//             .init()
//             .url(host);

//         this.timeout(15000);

//             // .then(function(){
//             //     this.timeout(15000);
//             // })
//         webdriverio.getTitle().then(function(title) {
//                 console.log('Title was: ' + title);
//             })
//             .end();
//     });
// });