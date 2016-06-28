var ResultsError = require('./results_error');
var ResultsDisplay = require('./results_display');

var Body = module.exports = React.createClass({
    displayName: 'IssuesViewerBody',
    render: function(){

      var error = IssuesViewStore.getProp('errorMessage');
      if(validObject(error)) return <ResultsError error={error} />;
      return <ResultsDisplay />;
    }
});