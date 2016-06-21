
var githubApiUrl = 'https://api.github.com';
var ServerApi = module.exports = {
  fetchOrgIssues: function(repoUser, repoName, page, resultsPerPage, successCallback){
    var repo = repoUser + '/' + repoName;
    $.ajax({
      url: githubApiUrl + '/repos/' + repo + '/issues?per_page='+ resultsPerPage +'&page='+ page,
      success: function(results){
          console.debug('result', results);

      }, error: function(e){
          console.error('Error fetching github issues for repo', repo , ': ', e);
      }
    });
  }
}