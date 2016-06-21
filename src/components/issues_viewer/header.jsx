var ContentEditableDiv = require('components/lib/content_editable_div');
var GithubLogo = require('src/images/Github-Mark.png');

var Header = module.exports = React.createClass({
    displayName: 'Header',
    render: function(){
      var style = {
        height: 56,
        zIndex: 998,
      }
      return <div className='white_background full_width' style={style}>
                <img src={GithubLogo} alt="Mountain View" style={{width:24,height:24}} />
            </div>
    }
});