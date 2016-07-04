var IssuesViewDispatcher = require('src/dispatchers/issues_view_dispatcher');
var IssuesViewAction = module.exports = {

    initData: function(routerParams){
        // console.debug('initData... actions file', routerParams);
        IssuesViewDispatcher.dispatch({
          actionType: IssuesViewEvents.INIT_DATA,
          data: { routerParams: routerParams }
        }); 
    },

    fetchIssues: function(page){
       IssuesViewDispatcher.dispatch({
         actionType: IssuesViewEvents.UPDATE_DATA,
         data: { page: page }
       }); 
    },

    resetData: function(){
        IssuesViewDispatcher.dispatch({
            actionType: IssuesViewEvents.RESET_DATA
        });
    },

    closeIssuePage: function(){
      IssuesViewDispatcher.dispatch({
            actionType: IssuesViewEvents.CLOSE_ISSUE_PAGE
      });
    },

    fetchIssueData: function(fetchIssueData, fetchComments){
      IssuesViewDispatcher.dispatch({
          actionType: IssuesViewEvents.FETCH_ISSUE_DETAILS,
          data: { fetchIssueData: fetchIssueData, 
                   fetchComments: fetchComments }
      });

    },
}