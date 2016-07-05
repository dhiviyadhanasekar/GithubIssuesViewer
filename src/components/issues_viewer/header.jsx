var ContentEditableDiv = require('components/lib/content_editable_div');
var GithubLogo = require('src/images/Github-Mark.png');

var Header = module.exports = React.createClass({
    
    displayName: 'Header',
    
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    updateUser: function(e){
        var userName = e.target.innerHTML.trim();
        console.debug('username', userName);
        if(validObject(userName) && userName.length > 0 && userName !== IssuesViewStore.getProp('repoUser')){
          this.context.router.push({
              pathname: '/gitissues/' + userName + '/' +IssuesViewStore.getProp('repoName')+'/issues',
          });
        }
    },

    updateRepo: function(e){
        var userRepoName = e.target.innerHTML.trim();
        console.debug('username', userRepoName);
        if(validObject(userRepoName) && userRepoName.length > 0 && userRepoName !== IssuesViewStore.getProp('repoName')){
          this.context.router.push({
              pathname: '/gitissues/' + IssuesViewStore.getProp('repoUser') + '/' + userRepoName +'/issues',
          });
        }
    },
    
    render: function(){
      var style = {
        height: 56,
        zIndex: 998,
        minWidth: 400,
      }
      return <div data-id='header' 
                  className='white_background flex row flex_center relative padding_40_left padding_40_right justify_sides z2' 
                  style={style}>
                <img src={GithubLogo} alt="Github Logo" style={{width:40,height:40}} className=''/>
                <div className='bold inline_flex margin_auto_right margin_30_left'>
                    <ContentEditableDiv class='placeholder' placeholder='Type Repo username here' text={IssuesViewStore.getProp('repoUser')} onEnterKey={this.updateUser} onBlur={this.updateUser}/>
                    <div className='margin_10_left margin_10_right'>/</div>
                    <ContentEditableDiv class='placeholder' placeholder='Type Repo name here' text={IssuesViewStore.getProp('repoName')} onEnterKey={this.updateRepo} onBlur={this.updateRepo}/>
                </div>
            </div>
    }
});