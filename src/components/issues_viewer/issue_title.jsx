var Link = require('react-router').Link;
var IssueTitle = module.exports = React.createClass({
    
    displayName: 'IssueTitle',
    propTypes: { issue: React.PropTypes.object.isRequired },

    getInitialState: function(){
        return {
          showPreview: false
        }
    },

    setShowPreview: function(value) { if(this.state.showPreview !== value) this.setState({ showPreview: value }); },
    showIssuePreview: function() { this.setShowPreview(true); },
    hideIssuePreview: function() { this.setShowPreview(false); },

    renderPreview: function(){
        if(this.state.showPreview === false) return null;
    },

    render: function(){
        return (
             <Link to={IssuesViewStore.getUrlPathName()+'/'+this.props.issue.number} 
                   className='bold pointer' 
                   onMouseEnter={this.showIssuePreview} 
                   onMouseLeave={this.hideIssuePreview} >
                #{this.props.issue.number}
                {this.renderPreview()}
            </Link>
        )
    }
});