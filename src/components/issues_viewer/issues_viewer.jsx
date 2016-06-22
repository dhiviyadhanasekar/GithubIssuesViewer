var Header = require('./header');
var IssuesViewer = module.exports = React.createClass({
    displayName: 'IssuesViewer',
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState: function(){
        return IssuesViewStore.getAllData();
    },
    updateDefaultUrl: function(){
        this.context.router.push({
                pathname: '/gitissues/npm/npm/issues',
                query: {
                  per_page: 25
                }
        })
    },
    componentWillReceiveProps(nextProps){
        console.debug('nextprops', nextProps);
    },
    componentWillMount: function(){
        this.updateDefaultUrl();
    },
    componentDidMount: function(){
        // console.log(ReactDOM.findDOMNode(this.refs.test));
        console.debug('this.state', this.state);
        console.debug('this.props', this.props);
    },
    render: function(){
        return <div className='u-max-full-width relative'>
                    <Header />
                </div>

    }
})