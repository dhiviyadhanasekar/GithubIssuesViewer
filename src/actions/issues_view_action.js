var IssuesViewDispatcher = require('src/dispatchers/issues_view_dispatcher');
var IssuesViewAction = module.exports = {

    initData: function(routerParams){
        IssuesViewDispatcher.dispatch({
          actionType: IssuesViewEvents.INIT_DATA,
          data: { routerParams: routerParams }
        }); 
    },

    fetchIssues: function(){
       IssuesViewDispatcher.dispatch({
         actionType: IssuesViewEvents.UPDATE_DATA,
         data: {  }
       }); 
    },
}