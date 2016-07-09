var assert = require('assert');
var selenium = require('selenium-webdriver');
var By = selenium.By;
var Until = selenium.Until;
var test = require('selenium-webdriver/testing');

var TestConstants = require('./../test_constants/TestConstants');
var host = TestConstants.PAGE_NOT_FOUND_URL; //'http://localhost:8090/#/gitissues/jbjdbkj';
var defaultPageUrl = TestConstants.BASE_HOST; //'http://localhost:8090/#/';

var driver;
test.describe('404 Error Page', function() {
  this.timeout(15000);

  test.beforeEach(function(){
      // console.log('before....');
      driver = new selenium.Builder().
          withCapabilities(TestConstants.BROWSER_TO_USE).
          build();
      driver.manage().window().maximize();
      driver.manage().timeouts().implicitlyWait(10000);

  });

  test.it('should display page not found', function() {
     driver.get(host);
     driver.wait(function() 
     {
        return driver.isElementPresent(By.className('testId_404_msg'));
     }, 20*1000);

     // then(function(){
      driver.findElement(By.className('testId_404_msg')).getInnerHtml().then(function(els){
          // console.log('els', els);
          assert.equal(els, 'Page not found');
      });
  });

  test.it('should have a link to the default page', function() {
     driver.get(host);
     driver.wait(function() 
     {
        return driver.isElementPresent(By.className('testId_redirect_to_home'));
     }, 20*1000);

     // then(function(){
      driver.findElement(By.className('testId_redirect_to_home')).getAttribute('href').then(function(els){
          // console.log('els', els);
          assert.equal(els, defaultPageUrl);
      });
  });
  
  test.afterEach(function(done){
      // console.log('done....');
      driver.quit();
      done();
  });
});