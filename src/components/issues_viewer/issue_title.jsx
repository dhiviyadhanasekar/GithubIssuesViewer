var Link = require('react-router').Link;
var PreviewTooltip = require('./preview_tooltip');
var MardownProcessor = require('src/utils/markdown_processor');

var IssueTitle = module.exports = React.createClass({
    
    displayName: 'IssueTitle',
    propTypes: { issue: React.PropTypes.object.isRequired },

    getInitialState: function(){
        return {
          showPreview: false
        }
    },

    setShowPreview: function(value) { 
        if(this.state.showPreview !== value) 
                this.setState({ showPreview: value }); 
    },

    showIssuePreview: function() { 
        this.setShowPreview(true); 
    },

    hideIssuePreview: function() { 
        this.setShowPreview(false); 
    },

    renderPreview: function(){

        if(this.state.showPreview === false) return null;
        var content = this.props.issue.body;
        // console.debug('contnet', content);
        var previewContent = <div style={{wordWrap: 'break-word'}} dangerouslySetInnerHTML={{ __html: MardownProcessor.getHtmlPreviewContent(content) }}></div>;
        return <PreviewTooltip content={previewContent} />;
    },

    render: function(){
        return (
            <div onMouseEnter={this.showIssuePreview} onMouseLeave={this.hideIssuePreview} >
                <Link to={IssuesViewStore.getUrlPathName()+'/'+this.props.issue.number} className='bold pointer testId_issue_number'>
                    #{this.props.issue.number}
                </Link>
                {this.renderPreview()}
            </div>
        )
    }
});