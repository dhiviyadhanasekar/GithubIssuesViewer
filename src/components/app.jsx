React = require('react');  
ReactDOM = require('react-dom');
Stylesheet = require('src/stylesheets/app.scss');
$ = require('jquery');
IssuesViewStore = require('src/stores/issues_view_store').IssuesViewStore;
validObject = require('src/utils/validity_util').validObject;

var AppRouter = require('./router/app_router');
var counter = 0;

var App = React.createClass({
    displayName: 'AppRouter',
    render: function(){
        console.debug('env', process.env.NODE_ENV);
        return ( <AppRouter counter={counter}/>);
    }
});

ReactDOM.render(<App />, document.getElementById('content'));

if (module.hot) {
    counter++;
    module.hot.accept();
}
