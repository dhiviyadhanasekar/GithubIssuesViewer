
var ReactModal = require('react-modal');
var Spinner = require('components/svg/spinner');


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
    top                        : '11%',//'35%',
    left                       : '15%',
    right                      : '15%',
    bottom                     : 'auto',
    background                 : '#fff',
    overflow                   : 'auto',
    WebkitOverflowScrolling    : 'touch',
    borderRadius               : '4px',
    outline                    : 'none',
    padding                    : '0',
    minHeight                  : 600,
    maxHeight                  : 600,
  }
};

var IssuePage = module.exports = React.createClass({
    displayName: 'IssuePageModal',
    getInitialState: function(){
      return {
        isModalOpen: validObject(IssuesViewStore.getProp('currentIssue'))
      }
    },
    
    closeModal: function(){
      $('body').removeClass('disable_y_scroll');
      IssuesViewAction.closeIssuePage.defer();
      this.setState({ isModalOpen: false});
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

        return <div className='black_background white padding_10' style={{width: '100%', height: 'auto'}}>
                    <a href={issueUrl} className='white'>
                        #{IssuesViewStore.getProp('currentIssue')} 
                        <span className='padding_10_left'>{this.getCurrentIssueDetails()}</span>
                    </a> 
                </div>
    },

    renderBody: function(){
        var resultsLoading = validObject(IssuesViewStore.getProp('currentIssueAjaxCallXhr'));
        if(resultsLoading === true){
          return <div className='round white_background padding_30 full_height inline_block' 
                      style={{width: '80%'}}>
                    <div className='flex_center margin_30_top'>Loading issue details...</div>
                    <div className='flex_center' style={{height: 80}}><Spinner /></div>
                </div>
        }

        return <div>contentjkebjwebjkbwekjVBewbvj</div>;

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
      if(this.state.isModalOpen !== newValue) this.setState({ isModalOpen: newValue });
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