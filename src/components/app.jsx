React = require('react');  
ReactDOM = require('react-dom');

var Route = require('react-router').Route;
var Router = require('react-router').Router;
var DefaultRoute = require('react-router').DefaultRoute;
var IndexRoute = require('react-router').IndexRoute;
var createHashHistory = require('history').createHashHistory;
var useRouterHistory = require('react-router').useRouterHistory;
const appHistory = useRouterHistory(createHashHistory)({ queryKey: false }) 

var counter = 0;
var Test = require('components/Test');

var App = module.exports = React.createClass({
    displayName: 'App',
    render: function(){
        console.debug('env', process.env.NODE_ENV);
        // return (<RouteHandler />); //<Test />;
        return ( <Router key={ counter } history={appHistory}>
                    <Route path="/" component={Test}>
                      <IndexRoute component={Test}/>
                      <Route path={'/issues'} component={Test}/>
                    </Route>
                </Router>);
    }
})

ReactDOM.render(<App />, document.getElementById('content'));

if (module.hot) {
    counter++;
    module.hot.accept();
}

