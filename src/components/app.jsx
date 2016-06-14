React = require('react');
ReactDOM = require('react-dom');

var Test = require('components/Test');
var App = module.exports = React.createClass({
    displayName: 'App',
    render: function(){
        console.debug('env', process.env.NODE_ENV);
        return <Test />;
    }
})

ReactDOM.render(<App />, document.getElementById('content'))
