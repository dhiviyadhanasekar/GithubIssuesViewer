var PageNumber = module.exports = React.createClass({
    
    changePage: function(e){
        var currentPage = IssuesViewStore.getProp('currentPage');
        if(currentPage === this.props.page) return;

        IssuesViewAction.fetchIssues(this.props.page);
    },

    render: function(){
        var currentPage = IssuesViewStore.getProp('currentPage');
        var text = this.props.text ? this.props.text : this.props.page;
        var klass = classnames('pointer bold padding_10 z1 white_background round margin_10_left'
                                  , {'z3 underline' : (currentPage === text)});

        return <a className={klass} onClick={this.changePage}>{text}</a>
    },
});