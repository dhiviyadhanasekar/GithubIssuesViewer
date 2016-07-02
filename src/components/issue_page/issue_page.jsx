var ReactModal = require('react-modal');
var IssueHeader = require('./issue_header');
var IssueBody = require('./issue_body');


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
                  <IssueBody />
              </ReactModal>
    }
});