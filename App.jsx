var React = require('react');
var ReactDOM = require('react-dom');
var App = module.exports = React.createClass({
    displayName: 'HelloReact',
    render: function(){
        return <div>Hello React</div>
    }
})

ReactDOM.render(<App />, document.getElementById('example'))
