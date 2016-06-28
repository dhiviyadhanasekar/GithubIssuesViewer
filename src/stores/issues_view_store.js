const IssuesViewEvents = require('src/app_constants/IssuesViewEvents'); 
var IssuesViewDispatcher = require('src/dispatchers/issues_view_dispatcher');
var ServerAPI = require('./server_api');
var BaseStore = require('./base_store');


var IssuesViewerData = {
  repoUser: 'npm',
  repoName: 'npm',
  issuesList: require('test/mock_issues_data'),//[],
  currentPage: 1,
  lastPage: 1,
  errorMessage: null,
  allIssuesAjaxCallXhr: null,
  currentIssueAjaxCallXhr: null,
  isIssueModalOpen: false,
  currentIssue: null,
  currentIssueData: null,
}
var user = {
  accessToken: null
}

// function getCopy(obj){
//   return JSON.parse(JSON.stringify(obj));
// }

var IssuesViewStore =  module.exports.IssuesViewStore = Object.assign({}, BaseStore, {

    getProp: function(prop){
      return IssuesViewerData[prop] ;
    },
    getAllData: function(){
        return IssuesViewerData;
    },
    getUrlPathName: function(){
        return '/gitissues/' + IssuesViewerData['repoUser']+ '/' +IssuesViewerData['repoName']+'/issues';
    },

});

var IssuesViewStoreOperations = {
    
    initData: function(routerParams){

        IssuesViewerData.repoUser = routerParams.repoUser + '';
        IssuesViewerData.repoName = routerParams.repoName + '';

        var issueNumber = routerParams.issueNumber;
        if(validObject(issueNumber)) IssuesViewerData.currentIssue = issueNumber;

    },
    fetchData: function(page){

        if(typeof(page) !== 'number') page = 1;

        IssuesViewerData.errorMessage = null;
        this.abortFetchData();
        
        IssuesViewerData.allIssuesAjaxCallXhr = ServerAPI.fetchOrgIssues(IssuesViewerData.repoUser, IssuesViewerData.repoName, page, this.onFetchDataSuccess, this.onFetchDataError);

    },
    abortFetchData: function(){

        if(IssuesViewerData.allIssuesAjaxCallXhr && IssuesViewerData.allIssuesAjaxCallXhr.readyState != 4){
          IssuesViewerData.allIssuesAjaxCallXhr.abort();
        }

    },
    onFetchDataSuccess: function( result ){

        console.debug('result', result);
        IssuesViewerData.allIssuesAjaxCallXhr = null;
        IssuesViewStore.emitChange(IssuesViewEvents.UPDATE_DATA);

    },
    onFetchDataError: function(error){

      console.debug('error', error);
      IssuesViewerData.allIssuesAjaxCallXhr = null;

      var statusText = '', gitmessage = '';
      if(error.statusText) statusText = error.statusText + ' - ';
      if(error.responseJSON && error.responseJSON.message) gitmessage = error.responseJSON.message;
      else if(error.responseText) gitmessage = JSON.stringify(error.responseText);

      IssuesViewerData.errorMessage = statusText + gitmessage;
      IssuesViewStore.emitChange(IssuesViewEvents.UPDATE_DATA);

    },
}

if(process.env.NODE_ENV !== 'production'){
  module.exports.IssuesViewStoreOperations = IssuesViewStoreOperations;
  module.exports.IssuesViewerData = IssuesViewerData;
}

IssuesViewDispatcher.register(function(action) {

  console.debug('action ------- ', action);

  var data = action.data;
  switch(action.actionType) {
    
    case IssuesViewEvents.INIT_DATA:
      IssuesViewStoreOperations.initData(data.routerParams);
      break;

    case IssuesViewEvents.UPDATE_DATA:
        IssuesViewStoreOperations.fetchData(data.page);

    default: break;
  }
});



