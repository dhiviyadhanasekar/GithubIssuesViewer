var IssuesViewConstants = require('src/app_constants/IssuesViewConstants');

var githubApiUrl = 'https://api.github.com';


var ServerApi = module.exports = {
  fetchOrgIssues: function(repoUser, repoName, page, successCallback, errorCallBack){

    var repo = repoUser + '/' + repoName;

    console.debug('in fetching issues....', repo);
    // return ; //todo: remove

    return $.ajax({
      url: githubApiUrl + '/repos/' + repo + '/issues?per_page='+ IssuesViewConstants.ISSUES_PER_PAGE +'&page='+ page,
      success: function(results){ //(,status, xhr){
          console.debug('result', results);
          if(successCallback) successCallback(results);

      }, error: function(e){
          if(e.statusText === 'abort') return;
          console.error('Error fetching github issues for repo', repo , ': ', e);
          if(errorCallBack) errorCallBack(e);
      }
    });
  },
  fetchIssueData: function(repoUser, repoName, issueNumber, successCallback, errorCallBack, fetchCommentsOnly){

    // return ; //todo: remove
    var repo = repoUser + '/' + repoName;

    if(!validObject(issueNumber)) return;

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
          if(e.statusText === 'abort') return;
          console.error('Error fetching github issue data for ', url , ': ', e);
          if(errorCallBack) errorCallBack(e);
      }
    });
  },
}

// Object {next: Object, last: Object}
// last
// :
// Object
// page
// :
// "98"
// per_page
// :
// "25"
// rel
// :
// "last"
// url
// :
// "https://api.github.com/repositories/321278/issues?per_page=25&page=98"
// __proto__
// :
// Object