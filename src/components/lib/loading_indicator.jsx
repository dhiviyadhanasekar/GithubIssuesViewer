var Spinner = require('components/svg/spinner');

var LoadingIndicator = module.exports = React.createClass({
    displayName: 'LoadingIndicator',
    propTypes: {
      style: React.PropTypes.object,
      klass: React.PropTypes.string,
    },
    render: function(){
      var loadingText = this.props.loadingText ? this.props.loadingText : 'Loading issues...';
      return (
          <div className={this.props.klass} style={this.props.style}>
              <div className='flex_center margin_30_top'>{loadingText}</div>
              <div className='flex_center' style={{height: 80}}><Spinner /></div>
          </div>
      )
    },
});