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
}