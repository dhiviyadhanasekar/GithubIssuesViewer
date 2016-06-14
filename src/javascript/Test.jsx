var Test = module.exports = React.createClass({
    displayName: 'TestHelloReact',
    componentDidMount: function(){
        console.log(ReactDOM.findDOMNode(this.refs.test));
    },
    render: function(){
        return <div ref='test'>Test jsx ... jbjdb</div>
    }
})