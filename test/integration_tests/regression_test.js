var supertest = require('supertest');
var chai = require('chai');
var expect = chai.expect;
var assert = require("assert");
var jsdom = require('jsdom-global')();
$ = jQuery = require('jquery');
_ = require('lodash');

var mock = require('mock-require');
mock('src/app_constants/IssuesViewEvents', '../../src/app_constants/IssuesViewEvents'); 
mock('src/dispatchers/issues_view_dispatcher', '../../src/dispatchers/issues_view_dispatcher');
mock('src/app_constants/IssuesViewConstants', '../../src/app_constants/IssuesViewConstants'); 

var IssuesViewStore = require('./../../src/stores/issues_view_store').IssuesViewStore;
var createAgent = function() {
  return supertest.agent('http://127.0.0.1:8090');
};

var agent = createAgent();