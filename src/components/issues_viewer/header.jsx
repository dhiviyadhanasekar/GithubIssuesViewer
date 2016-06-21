var ContentEditableDiv = require('components/lib/content_editable_div');
var GithubLogo = require('src/images/Github-Mark.png');

var Header = module.exports = React.createClass({
    displayName: 'Header',
    render: function(){
      var style = {
        height: 56,
        zIndex: 998,
      }
      return <div data-testId='header' className='white_background full_width flex' style={style}>
                <img src={GithubLogo} alt="Github Logo" style={{width:24,height:24}} />
            </div>
    }
});