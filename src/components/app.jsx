React = require('react');  
ReactDOM = require('react-dom');
Stylesheet = require('../stylesheets/app.scss');

var Route = require('react-router').Route;
var Router = require('react-router').Router;
var DefaultRoute = require('react-router').DefaultRoute;
var IndexRoute = require('react-router').IndexRoute;
var createHashHistory = require('history').createHashHistory;
var useRouterHistory = require('react-router').useRouterHistory;
const appHistory = useRouterHistory(createHashHistory)({ queryKey: false }) 

var counter = 0;
var IssuesViewer = require('components/issues_viewer/issues_viewer');

var AppRouter = React.createClass({
    displayName: 'AppRouter',
    render: function(){
        console.debug('env', process.env.NODE_ENV);
        return ( <Router key={ counter } history={appHistory}>
                    <Route path="/" component={IssuesViewer}>
                      <IndexRoute component={IssuesViewer}/>
                      <Route path={'/issues'} component={IssuesViewer}/>
                    </Route>
                </Router>);
    }
});

ReactDOM.render(<AppRouter />, document.getElementById('content'));

if (module.hot) {
    counter++;
    module.hot.accept();
}

