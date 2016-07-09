var assert = require('assert');
var selenium = require('selenium-webdriver');
var By = selenium.By;
var Until = selenium.Until;
var test = require('selenium-webdriver/testing');

var TestConstants = require('./../test_constants/TestConstants');
var issueNumber = '1';
var host =  TestConstants.CUSTOM_DEFAUL_PAGE_URL + '/' +issueNumber; 

var driver;
test.describe('Issue details page', function() {
  this.timeout(15000);

  test.before(function(){
      driver = new selenium.Builder().
          withCapabilities(TestConstants.BROWSER_TO_USE).
          build();
      driver.manage().window().maximize();
      driver.manage().timeouts().implicitlyWait(10000);
     driver.get(host);

  });

  test.it('url should launch the issue details modal without clicking on the issue number on the default page', function() {
     driver.wait(function() 
     {
        return driver.isElementPresent(By.className('testId_issue_modal'));
     }, 20*1000);

      driver.isElementPresent(By.className('testId_issue_modal')).then(function(els){
          assert.equal(els, true);
      });
  });

  test.it('should display issue number', function() {
     driver.wait(function() 
     {
        return driver.isElementPresent(By.className('testId_modal_issue_number'));
     }, 20*1000);

      driver.findElement(By.className('testId_modal_issue_number')).getText().then(function(elHtml){
          assert.equal(elHtml, '#' +issueNumber);
      });
  });

  test.it('should display issue title', function() {
     driver.wait(function() 
     {
        return driver.isElementPresent(By.className('testId_modal_issue_title'));
     }, 20*1000);

      driver.findElement(By.className('testId_modal_issue_title')).getInnerHtml().then(function(elHtml){
          assert.equal(elHtml, 'test');
      });
  });
  test.it('should display default page when modal is closed', function() {
    
     driver.findElement(By.className('testId_close_modal')).click().then(function(){
          driver.wait(function(){
              return driver.getCurrentUrl().then(function(url){
                  return url == TestConstants.CUSTOM_DEFAUL_PAGE_URL
              });
          }, 20*1000);
          driver.getCurrentUrl().then(function(url){
              assert.equal(url, TestConstants.CUSTOM_DEFAUL_PAGE_URL);
          });
      });
  });
  
  test.after(function(done){
      driver.quit();
      done();
  });
});