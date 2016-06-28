var Link = require('react-router').Link;

var IssuesCard = module.exports = React.createClass({
    render: function(){
        console.debug('issues....', this.props.issue);
        var issue = this.props.issue;
        return <div className='round white_background padding_10 margin_5_bottom padding_20_left relative z1 full_height container'>
                  <div className='row'>
                      <Link to={IssuesViewStore.getUrlPathName()+'/'+issue.number} className='bold'>
                        #{issue.number}
                      </Link>
                      <div className='padding_10_left'>{issue.title}</div>
                  </div>
                </div> 
    }
});