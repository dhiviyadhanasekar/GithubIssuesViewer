var Link = require('react-router').Link;
var UserAvatar = require('components/lib/user_avatar');

var IssuesCard = module.exports = React.createClass({
    render: function(){
        console.debug('issues....', this.props.issue);
        var issue = this.props.issue;
        return <div className='round white_background padding_10 margin_5_bottom padding_20_left relative z1 full_height container'>
                  <div className='row'>
                      <Link to={IssuesViewStore.getUrlPathName()+'/'+issue.number} className='bold pointer'>
                        #{issue.number}
                      </Link>
                      <div className='padding_10_left'>{issue.title}</div>
                      <div className='small gray margin_auto_left'><UserAvatar /></div>
                  </div>
                </div> 
    }
});