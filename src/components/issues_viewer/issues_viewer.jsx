var Header = require('./header');
var IssuesViewer = module.exports = React.createClass({
    displayName: 'IssuesViewer',
    getInitialState: function(){

        return IssuesStore.getAllData();
    },
    componentDidMount: function(){
        // console.log(ReactDOM.findDOMNode(this.refs.test));
        console.debug('this.state', this.state);
        
    },
    render: function(){
        return <div>
                    <Header />
                </div>

    }
})