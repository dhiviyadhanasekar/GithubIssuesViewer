var githubApiUrl = 'https://api.github.com';
var countPerPage =  25;

var ServerApi = module.exports = {
  fetchOrgIssues: function(repoUser, repoName, page, successCallback, errorCallBack){
    var repo = repoUser + '/' + repoName;
    $.ajax({
      url: githubApiUrl + '/repos/' + repo + '/issues?per_page='+ countPerPage +'&page='+ page,
      success: function(results){
          console.debug('result', results);
          if(validObject(successCallback)) successCallback(results);

      }, error: function(e){
          console.error('Error fetching github issues for repo', repo , ': ', e);
          if(validObject(errorCallBack)) errorCallBack(e);
      }
    });
  }
}