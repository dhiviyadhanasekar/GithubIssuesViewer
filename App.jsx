var React = require('react');
var ReactDOM = require('react-dom');
var Test = require('./src/javascript/Test');
var App = module.exports = React.createClass({
    displayName: 'App',
    render: function(){
        return <Test />;
    }
})

ReactDOM.render(<App />, document.getElementById('content'))
