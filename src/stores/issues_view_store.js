const IssuesViewEvents = require('src/app_constants/IssuesViewEvents'); 
var IssuesViewDispatcher = require('src/dispatchers/issues_view_dispatcher');
var ServerAPI = require('./server_api');
var BaseStore = require('./base_store');


var IssuesViewerData = {
  repoUser: 'npm',
  repoName: 'npm',
  issuesList: [],
  current_page: 0,
  last_page: 0,
  errorMessage: null,
  currentUser: null,
}

function getCopy(obj){
  return JSON.parse(JSON.stringify(obj));
}

var IssuesViewStore =  module.exports.IssuesViewStore = Object.assign({}, BaseStore, {

    getProp: function(prop){
      return getCopy( IssuesViewerData[prop] );
    },
    getAllData: function(){
        return getCopy(IssuesViewerData);
    },

});

var IssuesViewStoreOperations = {

}

IssuesViewDispatcher.register(function(action) {

  console.debug('action ------- ', action);

  var data = action.data;
  switch(action.actionType) {
    default: break;
  }
});



