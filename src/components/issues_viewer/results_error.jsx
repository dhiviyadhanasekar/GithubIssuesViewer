var SadSmiley = require('src/images/Sad-Smiley.png');

var NoResults = module.exports = React.createClass({
    displayName: 'NoResultsPage',
    propTypes: { error: React.PropTypes.string },
    render: function(){

      var errorDivStyle = {
          height: '90vh'
      };

      return (
        <div className='redlightest_background flex_center full_viewport_width round'
              style={errorDivStyle}> 
            <div className='align_center'>
                <div className='h4  margin_10_bottom'>
                  Sorry! There was an error, please refresh the page and try again.
                </div>
                <img className='margin_10_bottom' src={SadSmiley} style={{width: 40, height: 40}} />
                <div className='small' style={{maxWidth: 500}}>Error details: {this.props.error}</div>
            </div>
        </div> )
    }
});