var Link = require('react-router').Link;
var UserAvatar = require('components/lib/user_avatar');

var IssuesCard = module.exports = React.createClass({
    
    displayName: 'IssueCard',
    propTypes: {
      issue: React.PropTypes.object.isRequired
    },
    
    renderIssueNumberTitle: function(){
        return <div className='row'>
                  <Link to={IssuesViewStore.getUrlPathName()+'/'+this.props.issue.number} className='bold pointer'>
                    #{this.props.issue.number}
                  </Link>
                  <div className='padding_10_left'>{this.props.issue.title}</div>
                </div>
    },

    renderLabels: function(){
        return <div className='row verysmall'>jhjhj</div>;
    },

    render: function(){
        console.debug('issues....', this.props.issue);
        return <div className='round white_background padding_10 margin_5_bottom padding_20_left relative z1 full_height container'>
                  <div className='row'>
                    <div> {this.renderIssueNumberTitle()} {this.renderLabels()}</div>
                    <div className='margin_auto_left'><UserAvatar user={this.props.issue.user}/></div>
                  </div>
                </div> 
    }
});
