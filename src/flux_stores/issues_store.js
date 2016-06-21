var IssuesDispatcher = require('./../flux_dispatchers/issues_dispatcher');
var ServerAPI = require('./server_api');
var BaseStore = require('./base_store');


var IssuesViewerData = {
  repoUser: 'npm',
  repoName: 'npm',
  issuesList: [],
  currentUser: null,
  countPerPage: 25
}

var IssuesStore =  module.exports.IssuesStore = Object.assign({}, BaseStore, {

    getProp: function(prop){
      return JSON.parse(JSON.stringify( IssuesViewerData[prop] ));
    },
    getAllData: function(){
        return JSON.parse(JSON.stringify(IssuesViewerData));
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



