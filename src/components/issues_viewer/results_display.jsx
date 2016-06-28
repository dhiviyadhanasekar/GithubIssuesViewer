var IssuesCard = require('./issues_card');
var Spinner = require('components/svg/spinner');
var SearchResults = module.exports = React.createClass({
    

    render: function(){
        var resultsLoading = validObject(IssuesViewStore.getProp('allIssuesAjaxCallXhr'));
        if(resultsLoading === true){
          return
              <div className='margin_30 flex_center full_height'> 
                <div className='round white_background padding_30 full_height  inline_block' 
                      style={{width: '80%'}}>
                    <div className='flex_center margin_30_top'>Loading issues...</div>
                    <div className='flex_center' style={{height: 80}}><Spinner /></div>
                </div>
              </div>
        }

        var issues = IssuesViewStore.getProp('issuesList');
        if(!validObject(issues) || issues.length === 0 ){ 
          return
              <div className='margin_30 flex_center full_height'>  
                <div className='round white_background padding_20 full_height row' style={{width: '80%'}}>
                  No results available
                </div>
              </div>;
          }

        var issueCards = [];
        for(var i=0; i<issues.length; i++){
            issueCards.push(<IssuesCard issue={issues[i]} key={'issue_card_'+i}/>);
            // return issueCards; //todo: remove this
        }

        return  <div className='margin_30 full_height'>{issueCards}</div>;
    }
});