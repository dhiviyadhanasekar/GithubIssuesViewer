var Header = require('./header');
var Body = require('./body');

var IssuesViewer = module.exports = React.createClass({
    
    displayName: 'IssuesViewer',
    
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    getInitialState: function(){
        this.updateDefaultUrl(this.props);
        return IssuesViewStore.getAllData();
    },

    doesUrlNeedUpdate: function(props){
        var routes = props.routes;
        if(!validObject(routes) || routes.length < 1) return true;
        var currentSelectedRouteName = routes[routes.length-1].name;
        if(currentSelectedRouteName === 'full_url'){

            if(props.params.repoName == IssuesViewStore.getProp('repoName') 
                    && props.params.repoName == IssuesViewStore.getProp('repoName') )
                return false;

                IssuesViewAction.initData(props.params);
        }
        return true;

    },
    updateDefaultUrl: function(props){  
        if(this.doesUrlNeedUpdate(props) === false) return false;
        this.context.router.push({
                pathname: '/gitissues/' + IssuesViewStore.getProp('repoUser') + '/' +IssuesViewStore.getProp('repoName')+'/issues',
        });
        return true;
    },

    updateState: function(){
        this.setState(IssuesViewStore.getAllData());
    },
   
    componentWillReceiveProps: function(nextProps){
        console.debug('nextprops', nextProps);
        if(this.updateDefaultUrl(nextProps)=== true) this.updateState();
    },
   
    componentWillMount: function(){
    },
   
    componentDidMount: function(){
        // console.log(ReactDOM.findDOMNode(this.refs.test));
        // console.debug('this.state', this.state);
        // console.debug('this.props', this.props);
        IssuesViewStore.addChangeListener(IssuesViewEvents.UPDATE_DATA, this.updateState);
    },

    componentWillUnmount: function() {
        IssuesViewStore.removeChangeListener(IssuesViewEvents.UPDATE_DATA, this.updateState);
        IssuesViewAction.initData({repoName: 'npm', repoUser: 'npm'});
    },
   
    render: function(){
        return <div className='u-max-full-width relative'>
                    <Header />
                    <Body />
                </div>

    }
})