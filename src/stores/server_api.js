var IssuesViewConstants = require('src/app_constants/IssuesViewConstants');

var githubApiUrl = 'https://api.github.com';


var ServerApi = module.exports = {
  fetchOrgIssues: function(repoUser, repoName, page, successCallback, errorCallBack){
    var repo = repoUser + '/' + repoName;
    return $.ajax({
      url: githubApiUrl + '/repos/' + repo + '/issues?per_page='+ IssuesViewConstants.ISSUES_PER_PAGE +'&page='+ page,
      success: function(results){
          console.debug('result', results);
          if(successCallback) successCallback(results);

      }, error: function(e){
          console.error('Error fetching github issues for repo', repo , ': ', e);
          if(errorCallBack) errorCallBack(e);
      }
    });
  },
  fetchIssueData: function(repoUser, repoName, issueNumber, successCallback, errorCallBack, fetchCommentsOnly){
    var repo = repoUser + '/' + repoName;
    var url = githubApiUrl + '/repos/' + repo + '/issues/' + issueNumber;
    if(fetchCommentsOnly === true){
      url += '/comments';
    }

    return $.ajax({
      url: url,
      success: function(results){
          console.debug('result', results);
          if(successCallback) successCallback(results);

      }, error: function(e){
          console.error('Error fetching github issue data for ', url , ': ', e);
          if(errorCallBack) errorCallBack(e);
      }
    });
  },

   
  // initAuthentication: function(){
  //     $.ajax({
  //         url: 'https://github.com/login/oauth/authorize',
          
  //     });
  // },
}