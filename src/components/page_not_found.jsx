var Link = require('react-router').Link;
var SadSmiley = require('src/images/Sad-Smiley.png');

var PageNotFound = module.exports = React.createClass({
    displayName: 'PageNotFound',
    render: function(){
      return <div className='redlightest_background full_viewport_width full_viewport_height flex_center'>
              <div className='align_center'>
                <div className='h2 bold margin_10_bottom'>Page not found</div>
                <img className='margin_10_bottom' src={SadSmiley} style={{width: 40, height: 40}}/>
                <p>We're sorry, the page you're looking for doesn't exist</p>
                <Link to={'/'}>Go to default page</Link>
              </div>
              </div>
    }
});