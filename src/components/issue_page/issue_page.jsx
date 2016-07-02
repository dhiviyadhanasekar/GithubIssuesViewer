var ReactModal = require('react-modal');
var LoadingIndicator = require('components/lib/loading_indicator');
var ReporterAvatar = require('components/issues_viewer/reporter_avatar');
var MardownProcessor = require('src/utils/markdown_processor');
var IssueHeader = require('./issue_header');
var IssueSummary = require('./issue_summary');


var modalStyles = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(0, 0, 0, 0.25)',
    zIndex            : 9999,
    overflow                   : 'auto',
  },
  content : {
    position                   : 'absolute',
    top                        : '7%',//'35%',
    left                       : '10%',
    right                      : '10%',
    bottom                     : 'auto',
    background                 : '#F5F6F7',
    overflow                   : 'auto',
    WebkitOverflowScrolling    : 'touch',
    borderRadius               : '4px',
    outline                    : 'none',
    padding                    : '0',
    minHeight                  : 500,
    height                     : 'auto',
  }
};

var IssuePage = module.exports = React.createClass({
    
    displayName: 'IssuePageModal',

    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    getInitialState: function(){
      return {
        isModalOpen: validObject(IssuesViewStore.getProp('currentIssue'))
      }
    },

    updateUrl: function(){
        var pathName = IssuesViewStore.getUrlPathName();
        this.context.router.push({
            pathname: pathName,
        });
    },
    
    closeModal: function(){
      $('body').removeClass('disable_y_scroll');
      this.setState({isModalOpen: false});
      IssuesViewAction.closeIssuePage();
      this.updateUrl();
    },

    handleOnAfterOpenModal: function(){
        $('body').addClass('disable_y_scroll');
    },

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

    renderBody: function(){

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

    },

    componentDidMount: function(){
        var fetchData = !validObject(IssuesViewStore.getProp('currentIssueData'));
        var fetchComments = !!validObject(IssuesViewStore.getProp('currentIssueComments'));
        if(fetchData === true || fetchComments === true){
          IssuesViewAction.fetchIssueData(fetchData, fetchComments);
        }
    },
    componentWillReceiveProps: function(){
      var newValue = validObject(IssuesViewStore.getProp('currentIssue'));
      this.setState({ isModalOpen: newValue });
    },
    render: function(){
        return <ReactModal isOpen={this.state.isModalOpen} 
                            onRequestClose={this.closeModal}
                            onAfterOpen={this.handleOnAfterOpenModal}
                            style={modalStyles} className='z3 justify_center'>
                  <IssueHeader closeModal={this.closeModal}/>
                  {this.renderBody()}
              </ReactModal>
    }
});