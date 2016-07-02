var Labels = require('components/issues_viewer/labels');
var ReporterAvatar = require('components/issues_viewer/reporter_avatar');

var summaryHeaderStyle ={
  fontSize: 11,
  margin: 0,
}
var summarySectionStyle ={
  // borderBottom: '1px solid #d3d3d3'
}
var summarySectionClass = 'padding_10_bottom margin_10_bottom';

var IssueSummary = module.exports = React.createClass({

    renderSection: function(sectionName, sectionContent){
        return <div style={summarySectionStyle} className={summarySectionClass}>
                  <h3 style={summaryHeaderStyle}>{sectionName}</h3>
                  {sectionContent}
                </div>
    },

    getLabelContent: function(){
        var issue = this.props.issue;
        return issue.labels.length>0 
                ? <Labels klass='verysmall'  labelStyle={{marginBottom: 2}} issue={issue}/> 
                : <div className='verysmall'>None</div>
    },

    renderMilestone: function(){
        var milestone = this.props.issue.milestone;
        var content = null;
        if(validObject(milestone)){
          content = validObject(milestone.title) ? milestone.title : 'Title text empty';
        } else {
          content = 'None'
        }
        return <div className='verysmall'>{content}</div>
    },

    renderAssignees: function(){
        var assignees = this.props.issue.assignees;
        // if(assignees.length ===0) 
          // assignees.push(this.props.issue.user);
        if(assignees.length === 0) return <div className='verysmall'>None</div>;

        var assigneeContent = [];
        for(var i=0; i<assignees.length; i++){
            var user = assignees[i];
            assigneeContent.push(<div className='row flex_center' style={{marginLeft: '-5px'}}><ReporterAvatar key={'sum_assignee_'+i} user={user} /></div>);
        }

        return <div className='' style={{marginTop: 5}}>{assigneeContent}</div>
    },

    render: function(){

      var issue = this.props.issue;
      var openClosedLabel = {
        id: issue.id + '_' + 'status',
        labels: [{name: issue.state.toUpperCase(), color: '6cc644'}]
      }

      return <div className='margin_auto_left round white_background small z2 padding_10 column' 
                  style={{width: 100, paddingTop: 15, paddingBottom: 5}} >
                {this.renderSection('Status', <div className='bold'><Labels issue={openClosedLabel}/></div>)}
                {this.renderSection('Labels', this.getLabelContent())}
                {this.renderSection('Assignees', this.renderAssignees())}
                {this.renderSection('Milestone', this.renderMilestone())}
             </div>
    }
});