var ContentEditableDiv = require('components/lib/content_editable_div');
var GithubLogo = require('src/images/Github-Mark.png');

var Header = module.exports = React.createClass({
    displayName: 'Header',
    renderLogin: function(){
        <div className='margin_auto_left'>
           
        </div>
    },
    render: function(){
      var style = {
        height: 56,
        zIndex: 998,
        minWidth: 410,
      }
      return <div data-id='header' 
                  className='white_background flex row flex_center relative padding_40_left padding_40_right justify_sides z2' 
                  style={style}>
                <img src={GithubLogo} alt="Github Logo" style={{width:40,height:40}} className=''/>
                <div className='bold inline_flex margin_auto_right margin_30_left'>
                    <ContentEditableDiv class='placeholder' placeholder='Type Repo username here' text={IssuesViewStore.getProp('repoUser')}/>
                    <div className='margin_10_left margin_10_right'>/</div>
                    <ContentEditableDiv class='placeholder' placeholder='Type Repo name here' text={IssuesViewStore.getProp('repoName')}/>
                </div>
                 {this.renderLogin()}
            </div>
    }
});