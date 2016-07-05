var ReporterAvatar = require('components/issues_viewer/reporter_avatar');
var MardownProcessor = require('src/utils/markdown_processor');
var LoadingIndicator = require('components/lib/loading_indicator');
var IssueSummary = require('./issue_summary');

var IssueBody = module.exports = React.createClass({

    renderUserAndComment: function(issue){
        var body = issue.body;
        if(!validObject(body) || body.length === 0) body = '<div style="font-style: oblique;">No text available</div>';

        return <div className='row margin_10_bottom'>
                    <div className='margin_auto_right vertical_align_top' style={{width: 85}}>
                      <ReporterAvatar user={issue.user} dimensions={50}/>
                    </div>
                    <div className='round white_background small padding_10 z2 margin_10_right full_width full_height commentBox' style={{minHeight: 43}}>
                        <div style={{wordWrap: 'break-word',wordBreak: 'break-all'}} dangerouslySetInnerHTML={{ __html: MardownProcessor.convertToHtml(body) }}></div>
                    </div>
                </div>;
    },

    renderCommentsFetchError: function(issue){

        if(issue.comments === 0) return null; 
        var error = IssuesViewStore.getProp('currentCommentError');
        if(validObject(error)){
        return <div className='round  padding_10 red small full_height flex_center margin_10_top'>
                      Error fetching issue comments: {error}...
               </div>
        }

        var ajaxCall = IssuesViewStore.getProp('currentCommentsAjaxCallXhr');
        if(validObject(ajaxCall) === true || !validObject(IssuesViewStore.getProp('currentIssueComments')) ) {
          
          var loadingText = 'Loading comment';
          if(issue.comments > 1) loadingText += 's';
          loadingText += '...';
          
          return <LoadingIndicator klass='round graylightest_background full_height full_width inline_block' loadingText={loadingText} />
        }

        return null;
    },

    renderCommentsSection: function(issue){

        if(issue.comments === 0) return null; 
        var error = IssuesViewStore.getProp('currentCommentError');
        if(validObject(error)) return null;

        var comments = IssuesViewStore.getProp('currentIssueComments');
        if(!validObject(comments) || comments.length === 0) return null; //incase there is a sync issue between the data we fetched for issue details and comments

        var commentContent = [];
        for(var i=0; i<comments.length; i++){
          commentContent.push( this.renderUserAndComment( comments[i] ) );
        }

        return commentContent;
    },

    render: function(){
      var error = IssuesViewStore.getProp('currentIssueErrorMessage');
      if(validObject(error)){
        return <div className='padding_10 flex_center'>
                  <div className='round white_background z2 padding_20 flex_center red small full_height margin_50_left'>
                    Error fetching issue details: {error}
                  </div>
               </div>
      }

      var resultsLoading = validObject(IssuesViewStore.getProp('currentIssueAjaxCallXhr'));
      var issue = IssuesViewStore.getProp('currentIssueData');

      if(resultsLoading === true || !validObject(issue)){
        return <LoadingIndicator klass='round graylightest_background full_height full_width inline_block'/>
      }


      return <div> 
              <div className='padding_10 width_auto full_height row'>
                <div className='column'>
                  {this.renderUserAndComment(issue)}
                  {this.renderCommentsSection(issue)}
                </div>
                <IssueSummary issue={issue}/>
              </div>
              {this.renderCommentsFetchError(issue)}
             </div>;

    }
});