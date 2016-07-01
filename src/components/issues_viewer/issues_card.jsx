var IssueTitle = require('./issue_title');
var ReporterAvatar = require('./reporter_avatar');
var Labels = require('./labels');


var IssuesCard = module.exports = React.createClass({
    
    displayName: 'IssueCard',
    propTypes: {
      issue: React.PropTypes.object.isRequired
    },
    
    renderIssueNumberTitle: function(){
        return <div className='row padding_10_right'>
                  <IssueTitle issue={this.props.issue}/>
                  <div className='padding_10_left'>
                    {this.props.issue.title} {this.renderLabels()} 
                  </div>
                </div>
    },

    renderLabels: function(){
        return <Labels issue={this.props.issue} />;
    },

    render: function(){
        // console.debug('issues....', this.props.issue);
        return <div className='round white_background padding_10_bottom padding_10_top  margin_5_bottom padding_20_left relative z1 full_height container row' style={{minWidth: 415}}>
                    {this.renderIssueNumberTitle()}
                    <div className='margin_auto_left'><ReporterAvatar user={this.props.issue.user}/></div>
                </div> 
    }
});
