React = require('react');  
ReactDOM = require('react-dom');
Stylesheet = require('src/stylesheets/app.scss');
$ = require('jquery');
validObject = require('src/utils/utils').validObject;
ReactRedux = require("react-redux");

IssuesViewStore = require('src/stores/issues_view_store').IssuesViewStore;
store = require('src/stores/issues_view_store').store;
IssuesViewAction = require('src/actions/issues_view_action');
IssuesViewEvents = require('src/app_constants/IssuesViewEvents'); 


var AppRouter = require('./router/app_router');
var counter = 0;

Provider = require('react-redux').Provider;

var App = React.createClass({
    displayName: 'AppRouter',
    render: function(){
        console.debug('env', process.env.NODE_ENV);
        return ( <Provider store={store}><AppRouter counter={counter}/></Provider>);
    }
});

ReactDOM.render(<App />, document.getElementById('content'));

if (module.hot) {
    counter++;
    module.hot.accept();
}
