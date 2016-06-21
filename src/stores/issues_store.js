var IssuesDispatcher = require('src/dispatchers/issues_dispatcher');
var ServerAPI = require('./server_api');
var BaseStore = require('./base_store');


var IssuesViewerData = {
  repoUser: 'npm',
  repoName: 'npm',
  issuesList: [],
  currentUser: null,
  countPerPage: 25
}

function getCopy(obj){
  return JSON.parse(JSON.stringify(obj));
}

var IssuesStore =  module.exports.IssuesStore = Object.assign({}, BaseStore, {

    getProp: function(prop){
      return getCopy( IssuesViewerData[prop] );
    },
    getAllData: function(){
        return getCopy(IssuesViewerData);
    },

});

var IssuesStoreOperations = {

}

IssuesDispatcher.register(function(action) {

  console.debug('action ------- ', action);

  var data = action.data;
  switch(action.actionType) {
    default: break;
  }
});



