var ReactModal = require('react-modal');
var LoadingIndicator = require('components/lib/loading_indicator');
var ReporterAvatar = require('components/issues_viewer/reporter_avatar');
var MardownProcessor = require('src/utils/markdown_processor');


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

    getCurrentIssueDetails: function(prop){
        var currentIssueData = IssuesViewStore.getProp('currentIssueData');
        console.debug('currentIssueData', currentIssueData);
        if(!validObject(currentIssueData)) return '';
        if(!validObject(currentIssueData[prop])) return '';
        return currentIssueData[prop];
    },

    renderHeader: function(){
        var issueUrl = 'https://github.com/' + IssuesViewStore.getProp('repoUser')+ '/' + IssuesViewStore.getProp('repoName') +'/issues/' + IssuesViewStore.getProp('currentIssue');

        return <div className='black_background white padding_10 relative row' style={{width: 'auto', height: 'auto'}}>
                    <a href={issueUrl} className='white'>
                        <span>#{IssuesViewStore.getProp('currentIssue')}</span>
                        <span className='padding_10_left no_underline'>{this.getCurrentIssueDetails('title')}</span>
                    </a> 
                    <div className='margin_auto_left gray bold pointer' onClick={this.closeModal}>X</div>
                </div>
    },

    renderBody: function(){
        var resultsLoading = validObject(IssuesViewStore.getProp('currentIssueAjaxCallXhr'));
        var issue = IssuesViewStore.getProp('currentIssueData');
        
        if(resultsLoading === true || !validObject(issue)){
          return <LoadingIndicator klass='round graylightest_background full_height full_width inline_block'/>
        }


        return <div className='padding_10 width_auto full_height'>
                  <div className='row'>
                    <div className='margin_auto_right'>
                      <ReporterAvatar user={issue.user} displayUserName={false} dimensions={50}/>
                    </div>
                    <div className='round white_background small padding_10 z2'>
                        <div style={{wordWrap: 'break-word'}} dangerouslySetInnerHTML={{ __html: MardownProcessor.convertToHtml(issue.body) }}></div>
                    </div>
                  </div>
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
      // if(this.state.isModalOpen !== newValue) 
      this.setState({ isModalOpen: newValue });
    },
    render: function(){
        return <ReactModal isOpen={this.state.isModalOpen} 
                            onRequestClose={this.closeModal}
                            onAfterOpen={this.handleOnAfterOpenModal}
                            style={modalStyles} className='z3 justify_center'>
                  {this.renderHeader()}
                  {this.renderBody()}
              </ReactModal>
    }
});