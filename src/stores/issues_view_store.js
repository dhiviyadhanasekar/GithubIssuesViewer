const IssuesViewEvents = require('src/app_constants/IssuesViewEvents'); 
var IssuesViewDispatcher = require('src/dispatchers/issues_view_dispatcher');
var ServerAPI = require('./server_api');
var BaseStore = require('./base_store');

function copyOfInitData() {
    var initData = {
          repoUser: 'npm',
          repoName: 'npm',
          issuesList: require('test/mock_issues_data'),//[],
          currentPage: 1,
          lastPage: 1,
          errorMessage: null,
          allIssuesAjaxCallXhr: null,
          
          currentIssueAjaxCallXhr: {abort: function(){}},
          currentIssue: null,
          currentIssueErrorMessage: null,
          currentIssueData: null,

          currentIssueComments: null,
          currentCommentError: null,
          currentCommentsAjaxCallXhr: null,

          rateLimitRemaining: 60,
          rateLimit: 60,
    }
    return initData;
}

var IssuesViewerData = copyOfInitData();
var user = {
  accessToken: null
}


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
        IssuesViewerData.currentIssue = issueNumber;
        if(!validObject(issueNumber))  {
          IssuesViewerData.currentIssueData = null;
          IssuesViewerData.currentIssueComments = null;
          return;
        }


        if(!validObject(IssuesViewerData.currentIssueData) 
          || IssuesViewerData.currentIssueData.number != issueNumber){
              IssuesViewerData.currentIssueData = null;
              IssuesViewerData.currentIssueComments = null;
              for(var i=0; i<IssuesViewerData.issuesList.length; i++){
                  if(IssuesViewerData.issuesList[i].number != issueNumber) continue;
                  IssuesViewerData.currentIssueData = IssuesViewerData.issuesList[i];
                  if(IssuesViewerData.currentIssueData.comments == 0){
                    IssuesViewerData.currentIssueComments =[];
                  }
                  break;
              }       
        }

    },
    fetchData: function(page){

        if(typeof(page) !== 'number') page = 1;

        IssuesViewerData.errorMessage = null;
        IssuesViewerData.currentPage = page;
        if(IssuesViewerData.lastPage < page) IssuesViewerData.lastPage = page;
        this.abortFetchData();
        
        IssuesViewerData.allIssuesAjaxCallXhr = ServerAPI.fetchOrgIssues(IssuesViewerData.repoUser, IssuesViewerData.repoName, page, this.onFetchDataSuccess, this.onFetchDataError);

        IssuesViewStore.emitChange(IssuesViewEvents.UPDATE_DATA);

    },
    abortFetchData: function(){
        if(IssuesViewerData.allIssuesAjaxCallXhr && IssuesViewerData.allIssuesAjaxCallXhr.readyState != 4){
          IssuesViewerData.allIssuesAjaxCallXhr.abort();
        }
    },
    abortFetchIssueData: function(){
        if(IssuesViewerData.currentIssueAjaxCallXhr && IssuesViewerData.currentIssueAjaxCallXhr.readyState != 4){
          IssuesViewerData.currentIssueAjaxCallXhr.abort();
        }
    },
    abortFetchComments: function(){
      if(IssuesViewerData.currentCommentsAjaxCallXhr && IssuesViewerData.currentCommentsAjaxCallXhr.readyState != 4){
        IssuesViewerData.currentCommentsAjaxCallXhr.abort();
      }
    },
    onFetchDataSuccess: function( result ){

        console.debug('result', result);
        IssuesViewerData.allIssuesAjaxCallXhr = null;
        //todo: assign data for result & remainingLimit
        IssuesViewStore.emitChange(IssuesViewEvents.UPDATE_DATA);

    },
    onFetchDataError: function(error){

      console.debug('error', error);

      var statusText = '', gitmessage = '';
      if(error.statusText) statusText = error.statusText + ' - ';
      if(error.responseJSON && error.responseJSON.message) gitmessage = error.responseJSON.message;
      else if(error.responseText) gitmessage = JSON.stringify(error.responseText);

      IssuesViewerData.errorMessage = statusText + gitmessage;
      IssuesViewerData.allIssuesAjaxCallXhr = null;

      //todo: assign data for result & remainingLimit
      IssuesViewStore.emitChange(IssuesViewEvents.UPDATE_DATA);

    },

    resetData: function(){
        
        this.abortFetchData();
        this.abortFetchIssueData();
        this.abortFetchComments();
        var copy = copyOfInitData();
        copy.rateLimitRemaining = IssuesViewerData.rateLimitRemaining;
        IssuesViewerData = copy;

    },

    closeIssuePage: function(){
        this.abortFetchIssueData();
        this.abortFetchComments();
        IssuesViewerData.currentIssue = null;
        IssuesViewerData.currentIssueData = null;
        IssuesViewerData.currentIssueErrorMessage = null;
        IssuesViewerData.currentIssueAjaxCallXhr = null;
        IssuesViewStore.emitChange(IssuesViewEvents.UPDATE_DATA);
    },
}

if(process.env.NODE_ENV === 'test'){
  module.exports.IssuesViewStoreOperations = IssuesViewStoreOperations;
  module.exports.IssuesViewerData = IssuesViewerData;
}

IssuesViewDispatcher.register(function(action) {

  console.debug('action ------- ', action);

  var data = action.data;
  switch(action.actionType) {
    
    case IssuesViewEvents.INIT_DATA: IssuesViewStoreOperations.initData(data.routerParams); break;
    case IssuesViewEvents.UPDATE_DATA: IssuesViewStoreOperations.fetchData(data.page); break;
    case IssuesViewEvents.RESET_DATA: IssuesViewStoreOperations.resetData();break;
    case IssuesViewEvents.CLOSE_ISSUE_PAGE: IssuesViewStoreOperations.closeIssuePage(); break;
    default: break;
  }
});



