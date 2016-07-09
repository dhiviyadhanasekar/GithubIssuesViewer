var TestConstants = {
  BASE_HOST: 'http://localhost:8090/#/'
}

TestConstants.DEFAULT_PAGE_URL = TestConstants.BASE_HOST + 'gitissues/npm/npm/issues';
TestConstants.PAGE_NOT_FOUND_URL = TestConstants.BASE_HOST + 'gitissues/jbjdbkj';
TestConstants.CUSTOM_DEFAUL_PAGE_URL = TestConstants.BASE_HOST + 'gitissues/dhiviyadhanasekar/GithubIssuesViewer/issues';

TestConstants.BROWSER_TO_USE = require('selenium-webdriver').Capabilities.firefox();


module.exports = TestConstants;