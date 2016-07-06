// 'use strict';
// require('chai').should();

// var webdriver = require('selenium-webdriver');
// var By = webdriver.By;
// var until = webdriver.until;

// var driver = new webdriver.Builder()
//   .forBrowser('firefox')
//   .build();

// // describe('my blog', function() {
//   // it('should navigate to post', function(done) {
//     // console.log('herekcjbekj');
//     driver.get('http://www.google.com/ncr');
//     // this.timeout(15000);
//     driver.findElement(By.name('q')).sendKeys('webdriver');
//     // this.timeout(15000);
//     driver.findElement(By.name('btnG')).click();
//     // this.timeout(15000);
//     driver.wait(until.titleIs('webdriver - Google Search'), 1000);
//     // this.timeout(15000);
//     driver.quit();
//     // done();
//   // });
// // });


var assert = require('assert');
var selenium = require('selenium-webdriver');
var test = require('selenium-webdriver/testing');

 
test.describe('google search', function() {
  this.timeout(15000);
  test.it('check if textbox exists', function(done) {
    var driver = new selenium.Builder().
        withCapabilities(selenium.Capabilities.firefox()).
        build();
 
    driver.get('http://www.google.com/ncr');
    driver.isElementPresent(selenium.By.name('q'))
    .then(function(textbox) {
          console.log('textbox', textbox);
          assert.equal(textbox, true, "element present");
    }).then(function(){
      console.log('in done');
      driver.quit();
      done();
    });
 
  });
});