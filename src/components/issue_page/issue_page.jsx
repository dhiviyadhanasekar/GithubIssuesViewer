
var ReactModal = require('react-modal');
var LoadingIndicator = require('components/lib/loading_indicator');


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
    left                       : '10%',
    right                      : '10%',
    bottom                     : 'auto',
    background                 : '#fff',
    overflow                   : 'auto',
    WebkitOverflowScrolling    : 'touch',
    borderRadius               : '4px',
    outline                    : 'none',
    padding                    : '0',
    height                  : 500,
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
        if(resultsLoading === true){
          return <LoadingIndicator klass='round white_background full_height full_width inline_block'/>
        }

        return <div className='padding_20'>contentjkebjwebjkbwekjVBewbvj</div>;

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