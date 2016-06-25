var Route = require('react-router').Route;
var Router = require('react-router').Router;
var DefaultRoute = require('react-router').DefaultRoute;
var IndexRoute = require('react-router').IndexRoute;
var createHashHistory = require('history').createHashHistory;
var useRouterHistory = require('react-router').useRouterHistory;
const appHistory = useRouterHistory(createHashHistory)({ queryKey: false }) ;

var IssuesViewer = require('components/issues_viewer/issues_viewer');
var PageNotFound = require('components/page_not_found');

var AppRouter = module.exports = React.createClass({
    displayName: 'AppRouter',
    render: function(){
        return ( <Router key={ this.props.counter } history={appHistory}>
                    <Route path="/" component={IssuesViewer}>
                      <IndexRoute component={IssuesViewer}/>
                      <Route path={'/gitissues'} component={IssuesViewer}/>
                      <Route name='full_url' path={'/gitissues/:repoUser/:repoName/issues'} component={IssuesViewer}/>
                    </Route>
                    <Route path="*" component={PageNotFound} />
                </Router>);
    }
});

