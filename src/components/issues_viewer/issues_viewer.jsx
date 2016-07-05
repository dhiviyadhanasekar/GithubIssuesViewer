var Header = require('./header');
var Body = require('./body');
var IssuePage = require('components/issue_page/issue_page');

var IssuesViewer = module.exports = React.createClass({
    
    displayName: 'IssuesViewer',
    
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    needUpdateUrl: false,
    componentMounted: false,
    getInitialState: function(){
        this.needUpdateUrl = this.doesUrlNeedUpdate(this.props, true);
        return IssuesViewStore.getAllData();
    },

    doesUrlNeedUpdate: function(props, firstInit){

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
                return true;
        }

        if(firstInit === true){
            IssuesViewAction.initData({repoUser: 'npm', repoName: 'npm'});
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
        console.debug('setting state.....', IssuesViewStore.getAllData());
        if(this.componentMounted === true) this.setState(IssuesViewStore.getAllData());
        // console.debug('this.state', this.state);
    },
   
    componentWillReceiveProps: function(nextProps){
        console.debug('nextprops', nextProps);
        // console.debug('prevProps', prevProps);
        var updateUrl = this.updateDefaultUrl(nextProps);
        if(updateUrl === true) {
             this.needUpdateUrl = false;
             this.updateState();
        }
    },
   
    componentWillMount: function(){
        if(this.needUpdateUrl === true){
            this.needUpdateUrl = false;
            this.updateUrl();
        }
    },
   
    componentDidMount: function(){
        // console.debug('this.state', this.state);
        IssuesViewStore.addChangeListener(IssuesViewEvents.UPDATE_DATA, this.updateState);
        this.componentMounted = true;
        console.debug('this.needUpdateUrl', this.needUpdateUrl);
        // if(this.needUpdateUrl === false){ IssuesViewAction.fetchIssues(1) }
        // else {  this.updateState(); };
    },

    componentWillUnmount: function() {
        IssuesViewStore.removeChangeListener(IssuesViewEvents.UPDATE_DATA, this.updateState);
        IssuesViewAction.resetData();
        this.componentMounted = false;
    },
   
    render: function(){
        console.debug('this.state', this.state)
        return <div className='u-max-full-width relative'>
                    <Header />
                    <Body /> 
                    <IssuePage />
                </div>

    }
})