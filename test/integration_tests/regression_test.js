var assert = require('assert');
var selenium = require('selenium-webdriver');
var By = selenium.By;
var Until = selenium.Until;
var test = require('selenium-webdriver/testing');
var host = 'http://localhost:8090/#/gitissues/npm/npm/issues';

var driver;
test.describe('Github issues viewer', function() {
  this.timeout(15000);

  test.beforeEach(function(){
      console.log('before....');
      driver = new selenium.Builder().
          withCapabilities(selenium.Capabilities.firefox()).
          build();
      driver.manage().window().maximize();
      driver.manage().timeouts().implicitlyWait(5000);

  });
  test.it('check if 25 clickable issue numbers exist', function() {
    
    // var driver = new selenium.Builder().
    //     withCapabilities(selenium.Capabilities.firefox()).
    //     build();
    // driver.manage().window().maximize();
    // driver.manage().timeouts().implicitlyWait(5000);

 
     driver.get(host);
     driver.wait(function() 
     {
        return driver.isElementPresent(By.className('testId_issue_number'));
     }, 20*1000);

     // then(function(){
      driver.findElements(By.className('testId_issue_number')).then(function(els){
          assert.equal(els.length, 25 );
          var currentPage = IssuesViewStore.getProps('currentPage');
          console.log('currentPage', currentPage);
      })
      // .then(function(){
      //     driver.quit();
      //     done();
      // });
  });
  test.afterEach(function(done){
      console.log('done....');
      driver.quit();
      done();
  });
});

// test.describe('google search', function() {
//   this.timeout(15000);
//   test.it('check if textbox exists', function(done) {
//     var driver = new selenium.Builder().
//         withCapabilities(selenium.Capabilities.firefox()).
//         build();
 
//     driver.get('http://www.google.com/ncr');
//     driver.isElementPresent(selenium.By.name('q'))
//     .then(function(textbox) {
//           console.log('textbox', textbox);
//           assert.equal(textbox, true, "element present");
//     }).then(function(){
//       console.log('in done');
//       driver.quit();
//       done();
//     });
 
//   });
// });