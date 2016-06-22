var IssuesViewDispatcher = require('src/dispatchers/issues_view_dispatcher');
const IssuesViewEvents = require('src/app_constants/IssuesViewEvents'); 
var IssuesViewAction = module.exports = {

    fetchIssues: function(){
       IssuesDispatcher.dispatch({
         actionType: IssuesViewEvents.UPDATE_DATA,
         data: {  }
       }); 
    },

}