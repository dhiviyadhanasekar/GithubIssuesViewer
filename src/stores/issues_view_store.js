const IssuesViewEvents = require('src/app_constants/IssuesViewEvents'); 
var IssuesViewDispatcher = require('src/dispatchers/issues_view_dispatcher');
var ServerAPI = require('./server_api');
var BaseStore = require('./base_store');
var parseLink = require('parse-link-header');

function copyOfInitData() {
    var initData = {
          repoUser: '',
          repoName: '',
          
          issuesList: [],
          // issuesList: require('test/mock_issues_data'),
          errorMessage: null,
          allIssuesAjaxCallXhr: null,

          currentPage: 1,
          lastPage: 1,
          
          currentIssueAjaxCallXhr: null,
          currentIssue: null,
          currentIssueErrorMessage: null,
          currentIssueData: null,

          currentIssueComments: null,
          currentCommentError: null,
          currentCommentsAjaxCallXhr: null,

          // rateLimitRemaining: 60, //not currently used, was intended for oauth
          // rateLimit: 60,
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
        return  _.cloneDeep(IssuesViewerData);
    },
    getUrlPathName: function(){
        return '/gitissues/' + IssuesViewerData['repoUser']+ '/' +IssuesViewerData['repoName']+'/issues';
    },

});

var IssuesViewStoreOperations = {

    fetchIssueDataAndComments: function(data){
        // repoUser, repoName, issueNumber, successCallback, errorCallBack, fetchCommentsOnly

        if(data.fetchIssueData === true){
            IssuesViewerData.currentIssueErrorMessage = null;
            this.abortFetchIssueData();
            // console.debug(' IssuesViewerData.currentIssue 2',  IssuesViewerData.currentIssue);
            IssuesViewerData.currentIssueAjaxCallXhr = ServerAPI.fetchIssueData( IssuesViewerData.repoUser,
                                                            IssuesViewerData.repoName, 
                                                            IssuesViewerData.currentIssue, 
                                                            this.onFetchIssueSuccess,
                                                            this.onFetchIssueError, false );
        }

        if(data.fetchComments === true){

          IssuesViewerData.currentCommentError = null;
          this.abortFetchComments();
          console.debug(' IssuesViewerData.currentIssue 2',  IssuesViewerData.currentIssue);
          IssuesViewerData.currentCommentsAjaxCallXhr = ServerAPI.fetchIssueData( IssuesViewerData.repoUser,
                                                          IssuesViewerData.repoName, 
                                                          IssuesViewerData.currentIssue, 
                                                          this.onFetchCommentSuccess,
                                                          this.onFetchCommentError, true );

        }

        IssuesViewStore.emitChange(IssuesViewEvents.UPDATE_DATA);

    },

    onFetchCommentSuccess: function(result){
        IssuesViewerData.currentCommentsAjaxCallXhr = null;
        IssuesViewerData.currentIssueComments = result;
        IssuesViewStore.emitChange(IssuesViewEvents.UPDATE_DATA);
    },

    onFetchCommentError: function(error){
        IssuesViewerData.currentCommentError = IssuesViewStoreOperations.extractErrorMessage(error);
        IssuesViewerData.currentCommentsAjaxCallXhr = null;
        IssuesViewStore.emitChange(IssuesViewEvents.UPDATE_DATA);
    },

    onFetchIssueSuccess: function( result ){
        // console.debug('result', result);
        IssuesViewerData.currentIssueAjaxCallXhr = null;
        IssuesViewerData.currentIssueData = result;
        IssuesViewStore.emitChange(IssuesViewEvents.UPDATE_DATA);
    },

    extractErrorMessage: function(error){
        var statusText = '', gitmessage = '';
        if(error.statusText) statusText = error.statusText + ' - ';
        if(error.responseJSON && error.responseJSON.message) gitmessage = error.responseJSON.message;
        else if(error.responseText) gitmessage = JSON.stringify(error.responseText);

        return statusText + gitmessage;
    },

    onFetchIssueError: function(error){
        IssuesViewerData.currentIssueErrorMessage = IssuesViewStoreOperations.extractErrorMessage(error);//statusText + gitmessage;
        IssuesViewerData.currentIssueAjaxCallXhr = null;
        IssuesViewStore.emitChange(IssuesViewEvents.UPDATE_DATA);
    },

    initData: function(routerParams){

        var fetchIssuesFromGit = false;
        if(IssuesViewerData.repoUser !== routerParams.repoUser || IssuesViewerData.repoName !== routerParams.repoName){
            console.debug('changing stuff....');
            IssuesViewerData.currentPage = 1;
            IssuesViewerData.lastPage = 1;
            IssuesViewerData.errorMessage = null;
            fetchIssuesFromGit = true;
        }
        IssuesViewerData.repoUser = routerParams.repoUser + '';
        IssuesViewerData.repoName = routerParams.repoName + '';
        if(fetchIssuesFromGit === true) {
          console.debug('IssuesViewerData.repoUser, IssuesViewerData.repoName', IssuesViewerData.repoUser, IssuesViewerData.repoName);
          this.fetchData(1);
        }

        var issueNumber = routerParams.issueNumber;
        
        IssuesViewerData.currentIssue = issueNumber;
        if(!validObject(issueNumber))  {
          console.debug('not a validObject....');
          IssuesViewerData.currentIssueData = null;
          IssuesViewerData.currentIssueComments = null;
          IssuesViewerData.currentIssueErrorMessage = null;
          IssuesViewerData.currentCommentError = null;
          return;
        }

        console.debug(' IssuesViewerData.currentIssue',  IssuesViewerData.currentIssue);

        if(!validObject(IssuesViewerData.currentIssueData) 
          || IssuesViewerData.currentIssueData.number != issueNumber){

              IssuesViewerData.currentIssueData = null;
              IssuesViewerData.currentIssueComments = null;
              IssuesViewerData.currentIssueErrorMessage = null;
              IssuesViewerData.currentCommentError = null;

              if(validObject(IssuesViewerData.issuesList)){
              for(var i=0; i<IssuesViewerData.issuesList.length; i++){
                  if(IssuesViewerData.issuesList[i].number != issueNumber) continue;
                  IssuesViewerData.currentIssueData = IssuesViewerData.issuesList[i];
                  if(IssuesViewerData.currentIssueData.comments == 0){
                    IssuesViewerData.currentIssueComments =[];
                  }
                  break;
              }
            }       
        }

    },
    fetchData: function(page){

        if(!validObject(page)) page = IssuesViewerData.currentPage;
        if(typeof(page) !== 'number') page = 1;

        if(IssuesViewerData.lastPage < page) return;
        //IssuesViewerData.lastPage = page;

        IssuesViewerData.errorMessage = null;
        IssuesViewerData.currentPage = page;
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

        // console.debug('result', result);
        // console.debug('xhr...', IssuesViewerData.allIssuesAjaxCallXhr.getResponseHeader("Link"));
        var linkHeader = IssuesViewerData.allIssuesAjaxCallXhr.getResponseHeader("Link");
        var parsedLinks = parseLink(linkHeader);
        console.debug('parsedLinks', parsedLinks);
        if( validObject(parsedLinks) && validObject(parsedLinks['last']) && parsedLinks['last']['page']) {
            var lastPage = parsedLinks['last']['page'];
            if(isNaN(lastPage) === false){
              lastPage = parseInt(lastPage);
              IssuesViewerData.lastPage = lastPage;
            }
        }
        IssuesViewerData.issuesList = result;
        IssuesViewerData.allIssuesAjaxCallXhr = null;
        IssuesViewStore.emitChange(IssuesViewEvents.UPDATE_DATA);

    },

    onFetchDataError: function(error){

      IssuesViewerData.errorMessage = IssuesViewStoreOperations.extractErrorMessage(error);//statusText + gitmessage;
      IssuesViewerData.allIssuesAjaxCallXhr = null;
      IssuesViewStore.emitChange(IssuesViewEvents.UPDATE_DATA);
    },

    resetData: function(){
        
        this.abortFetchData();
        this.abortFetchIssueData();
        this.abortFetchComments();
        var copy = copyOfInitData();
        // copy.rateLimitRemaining = IssuesViewerData.rateLimitRemaining;
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
    case IssuesViewEvents.FETCH_ISSUE_DETAILS: IssuesViewStoreOperations.fetchIssueDataAndComments(data); break;
    default: break;
  }
});



