var SadSmiley = require('src/images/Sad-Smiley.png');

var Body = module.exports = React.createClass({
    render: function(){

      var error = IssuesViewStore.getProp('errorMessage');
      var errorDivStyle = {
          // width: '80vw', 
          // height: '80vh',
      }
      if(validObject(error)){
        return (
        <div className='redlightest_background flex_center full_viewport_width full_viewport_height round' style={errorDivStyle}> 
            <div className='align_center'>
                <div className='h4  margin_10_bottom'>
                  Sorry! There was an error, please refresh the page and try again.
                </div>
                <img className='margin_10_bottom' src={SadSmiley} style={{width: 40, height: 40}} />
                <div class='small'>Error details: {error}</div>
            </div>
        </div> )
      }
      return <div></div>
    }
});