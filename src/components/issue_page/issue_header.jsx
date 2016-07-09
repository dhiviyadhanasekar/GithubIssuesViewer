var IssueHeader = module.exports = React.createClass({

    getCurrentIssueDetails: function(prop){
        var currentIssueData = IssuesViewStore.getProp('currentIssueData');
        console.debug('currentIssueData', currentIssueData);
        if(!validObject(currentIssueData)) return '';
        if(!validObject(currentIssueData[prop])) return '';
        return currentIssueData[prop];
    },

    render: function(){
        var issueUrl = 'https://github.com/' + IssuesViewStore.getProp('repoUser')+ '/' + IssuesViewStore.getProp('repoName') +'/issues/' + IssuesViewStore.getProp('currentIssue');

        return <div className='black_background white padding_10 relative row' style={{width: 'auto', height: 'auto'}}>
                    <a href={issueUrl} className='white'>
                        <span className='testId_modal_issue_number'>#{IssuesViewStore.getProp('currentIssue')}</span>
                        <span className='padding_10_left no_underline testId_modal_issue_title'>{this.getCurrentIssueDetails('title')}</span>
                    </a> 
                    <div className='margin_auto_left gray bold pointer testId_close_modal' onClick={this.props.closeModal}>X</div>
                </div>      
    }
});