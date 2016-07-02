var ReporterAvatar = require('components/issues_viewer/reporter_avatar');
var MardownProcessor = require('src/utils/markdown_processor');
var LoadingIndicator = require('components/lib/loading_indicator');
var IssueSummary = require('./issue_summary');

var IssueBody = module.exports = React.createClass({

    renderUserAndComment: function(issue){
        var body = issue.body;
        if(!validObject(body) || body.length === 0) body = '<div style="font-style: oblique;">No text available</div>';

        return <div className='row margin_10_bottom'>
                    <div className='margin_auto_right vertical_align_top'>
                      <ReporterAvatar user={issue.user} dimensions={50}/>
                    </div>
                    <div className='round white_background small padding_10 z2 margin_10_right full_width full_height' style={{minHeight: 43}}>
                        <div style={{wordWrap: 'break-word',wordBreak: 'break-all'}} dangerouslySetInnerHTML={{ __html: MardownProcessor.convertToHtml(body) }}></div>
                    </div>
                </div>;
    },

    render: function(){
      var error = IssuesViewStore.getProp('currentIssueErrorMessage');
      if(validObject(error)){
        return <div className='padding_10 flex_center'>
                  <div className='round white_background z2 padding_20 flex_center red small full_height full_width'>
                    Error fetching issue details: {error}
                  </div>
               </div>
      }

      var resultsLoading = validObject(IssuesViewStore.getProp('currentIssueAjaxCallXhr'));
      var issue = IssuesViewStore.getProp('currentIssueData');

      if(resultsLoading === true || !validObject(issue)){
        return <LoadingIndicator klass='round graylightest_background full_height full_width inline_block'/>
      }


      return <div className='padding_10 width_auto full_height row'>
              <div className='column'>
                {this.renderUserAndComment(issue)}
                {this.renderUserAndComment(issue)}
              </div>
                <IssueSummary issue={issue}/>
             </div>;

    }
});