var IssuesViewDispatcher = require('src/dispatchers/issues_view_dispatcher');
var IssuesViewAction = module.exports = {

    initData: function(routerParams){
        // IssuesViewDispatcher.dispatch({
        console.debug('in actions');
        return {
          actionType: IssuesViewEvents.INIT_DATA,
          data: { routerParams: routerParams }
        }
        // }); 
    },

    fetchIssues: function(){
       // IssuesViewDispatcher.dispatch({
      return {
         actionType: IssuesViewEvents.UPDATE_DATA,
         data: {  }
      }
       // }); 
    },
}