var Header = require('./header');
var Body = require('./body');
var IssuePage = require('components/issue_page/issue_page');

var IssuesViewer = module.exports = React.createClass({
    
    displayName: 'IssuesViewer',
    
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    needUpdateUrl: false,
    getInitialState: function(){
        this.needUpdateUrl = this.doesUrlNeedUpdate(this.props);
        return IssuesViewStore.getAllData();
    },

    doesUrlNeedUpdate: function(props){

        // console.debug('doesUrlNeedUpdate props', props);
       
        var currentUrl = this.getUrlToSet();
        console.debug('newurl', currentUrl);
        console.debug('current url', props.location.pathname);
        if(props.location.pathname == currentUrl) return false;

        var routes = props.routes;
         var currentSelectedRouteName = routes[routes.length-1].name;
        if(currentSelectedRouteName === 'full_url' || currentSelectedRouteName === 'issue_page'){
            if(validObject(props.params.repoUser) 
                && props.params.repoUser === IssuesViewStore.getProp('repoUser') 
                && validObject(props.params.repoName) 
                && props.params.repoName === IssuesViewStore.getProp('repoName') 
                && props.params.issueNumber === IssuesViewStore.getProp('currentIssue'))
                return false;

                IssuesViewAction.initData(props.params);
        }
        return true;

    },
    updateDefaultUrl: function(props){  
        if(this.doesUrlNeedUpdate(props) === false) return false;
        this.updateUrl();
        return true;
    },

    getUrlToSet: function(){
        var pathName = IssuesViewStore.getUrlPathName();
        var issue = IssuesViewStore.getProp('currentIssue');
        if(validObject(issue)) pathName += '/' + issue;
        console.debug('pathName', pathName);
        return pathName;
    },

    updateUrl: function(){
        this.context.router.push({
            pathname: this.getUrlToSet(),
        });
    },

    updateState: function(){
        // console.debug('setting state.....', IssuesViewStore.getAllData());
        this.setState(IssuesViewStore.getAllData());
        // console.debug('this.state', this.state);
    },
   
    componentWillReceiveProps: function(nextProps, prevProps){
        console.debug('nextprops', nextProps);
        console.debug('prevProps', prevProps);
        var updateUrl = this.updateDefaultUrl(nextProps);
        if(updateUrl === true) this.updateState();
    },
   
    componentWillMount: function(){
        if(this.needUpdateUrl === true){
            this.needUpdateUrl = false;
            this.updateUrl();
        }
    },
   
    componentDidMount: function(){
        // console.log(ReactDOM.findDOMNode(this.refs.test));
        console.debug('this.state', this.state);
        // console.debug('this.props', this.props);
        IssuesViewStore.addChangeListener(IssuesViewEvents.UPDATE_DATA, this.updateState);
        // IssuesViewAction.fetchIssues(this.state.currentPage);
    },

    componentWillUnmount: function() {
        IssuesViewStore.removeChangeListener(IssuesViewEvents.UPDATE_DATA, this.updateState);
        IssuesViewAction.resetData(); 
    },
   
    render: function(){
        return <div className='u-max-full-width relative'>
                    <Header />
                    <Body /> 
                    <IssuePage />
                </div>

    }
})