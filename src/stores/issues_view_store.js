const IssuesViewEvents = require('src/app_constants/IssuesViewEvents'); 
// var IssuesViewDispatcher = require('src/dispatchers/issues_view_dispatcher');
var ServerAPI = require('./server_api');
// var BaseStore = require('./base_store');
var createStore = require('redux').createStore;


var IssuesViewerData = [{
  repoUser: 'npm',
  repoName: 'npm',
  issuesList: [],
  current_page: 0,
  last_page: 0,
  errorMessage: null,
  currentUser: null,
}];

// function getCopy(obj){
//   return JSON.parse(JSON.stringify(obj));
// }

// var IssuesViewStore =  module.exports.IssuesViewStore = Object.assign({}, BaseStore, {

var IssuesViewStore =  module.exports.IssuesViewStore = {
    getProp: function(prop){
      // return getCopy( IssuesViewerData[prop] );
      var state = store.getState();
      return state[state.length-1][prop];
    },
    getAllData: function(){
        // return getCopy(IssuesViewerData);
        var state = store.getState();
        return state[state.length-1];
    },
}
// });

var IssuesViewStoreOperations = {
    initData: function(newState,routerParams){
        newState.repoUser = routerParams.repoUser;
        newState.repoName = routerParams.repoName;
        return newState;
    },
}

// IssuesViewDispatcher.register(function(action) {

function dispatchImplementer(state, action){  

  console.debug('action ------- ', action);

  var data = action.data;
  state = state || initialState;
  var newState = Object.assign({}, state);

  switch(action.actionType) {
    
    case IssuesViewEvents.INIT_DATA:
      return IssuesViewStoreOperations.initData(data.routerParams);

    default: return state;
  }
}
// });


module.exports.store = createStore(dispatchImplementer, IssuesViewerData);



