var assert = require('assert');
var selenium = require('selenium-webdriver');
var By = selenium.By;
var Until = selenium.Until;
var test = require('selenium-webdriver/testing');

var TestConstants = require('./../test_constants/TestConstants');
var host = TestConstants.DEFAULT_PAGE_URL; //'http://localhost:8090/#/gitissues/npm/npm/issues';

var driver;
test.describe('Github issues viewer', function() {
  this.timeout(15000);

  test.beforeEach(function(){
      driver = new selenium.Builder().
          withCapabilities(TestConstants.BROWSER_TO_USE).
          build();
      driver.manage().window().maximize();
      driver.manage().timeouts().implicitlyWait(10000);

  });

  test.it('should have 25 clickable issue numbers and open the issue details modal on first issue number click', function() {
     driver.get(host);
     driver.wait(function() 
     {
        return driver.isElementPresent(By.className('testId_issue_number'));
     }, 20*1000);

     // then(function(){
      driver.findElements(By.className('testId_issue_number')).then(function(els){
          assert.equal(els.length, 25 );
          els[0].click();
          driver.wait(function() 
          {
             return driver.isElementPresent(By.className('testId_issue_modal'));
          }, 20*1000);
          driver.findElements(By.className('testId_issue_modal')).then(function(els){
              assert(els, true);
          });
      });
  });

  test.it('should have issue reporter linked to github profile', function() {
     driver.get(host);
     driver.wait(function() 
     {
        return driver.isElementPresent(By.className('testId_reporter_avatar'));
     }, 20*1000);

     // then(function(){
      driver.findElements(By.className('testId_reporter_avatar')).then(function(avatarEl){
          var reporterAvatar = avatarEl[0];
          reporterAvatar.findElement(By.className('testId_username')).getInnerHtml().then(function(userName){
            userName = userName.substring(1, userName.length);
            reporterAvatar.getAttribute('href').then(function(avatarLink){
                // console.log('link', avatarLink, ', userName', userName);
                assert.equal(avatarLink, 'https://github.com/' + userName );
            });
          });
      });
  });

  test.it('should show issue details preview when you hover over an issue number', function() {
     driver.get(host);
     driver.wait(function() 
     {
        return driver.isElementPresent(By.className('testId_issue_number'));
     }, 20*1000);

     driver.findElements(By.className('testId_issue_number')).then(function(els){
          driver.actions().mouseMove(els[0]).perform().then(function(){
            driver.wait(function() 
            {
               return driver.isElementPresent(By.className('testId_preview'));
            }, 20*1000);
            driver.isElementPresent(By.className('testId_preview')).then(function(els){
                assert(els, true);
            });
          });
      });
  });

  test.afterEach(function(done){
      driver.quit();
      done();
  });
});