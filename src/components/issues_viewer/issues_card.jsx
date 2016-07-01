var IssueTitle = require('./issue_title');
var ReporterAvatar = require('./reporter_avatar');


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

        var labelArray = [];
        var labels = this.props.issue.labels;
        var label = null;
        
        for(var i=0; i<labels.length; i++){
              var label = labels[i];
              var style = {
                paddingTop: 3,
                paddingBottom: 3,
                paddingRight: 7,
                paddingLeft: 7,
                marginRight: 5,
                background: '#' + label.color,
              }
              labelArray.push(
                <div key={this.props.issue.id + '_' + 'label' + i} style={style} className='white round '>
                  {label.name}
                </div>
              );
        }

        return <div className='row verysmall' style={{paddingTop: 2}}>{labelArray}</div>;
    },

    render: function(){
        // console.debug('issues....', this.props.issue);
        return <div className='round white_background padding_10_bottom padding_10_top  margin_5_bottom padding_20_left relative z1 full_height container row' style={{minWidth: 415}}>
                    {this.renderIssueNumberTitle()}
                    <div className='margin_auto_left'><ReporterAvatar user={this.props.issue.user}/></div>
                </div> 
    }
});
