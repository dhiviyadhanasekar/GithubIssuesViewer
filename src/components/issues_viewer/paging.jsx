var PageNumber = require('./page_number');

var firstPage = 1;
var Paging = module.exports = React.createClass({
    
    render: function(){
        
        var store = IssuesViewStore;
        var currentPage = store.getProp('currentPage');
        var lastPage = store.getProp('lastPage');
        console.debug('store', currentPage, lastPage);

        if(lastPage === firstPage) return null;

        var pagesToDisplay = [];
        var numbersDisplayed = 0;

        if(currentPage !== 1){
            pagesToDisplay.push(<PageNumber text='<<' page={firstPage} />);
            pagesToDisplay.push(<PageNumber text='<' page={currentPage-1} />);
        }

        var i=currentPage-2;
        var end = currentPage + 2;
        if(end > lastPage){ i -= (end-lastPage); }
        for(; numbersDisplayed<5 && i<=lastPage; i++ ){
            if(i > 0){
              numbersDisplayed++;
              pagesToDisplay.push(<PageNumber page={i} />);
            }
        }

        if(currentPage !== lastPage){
            pagesToDisplay.push(<PageNumber text='>' page={currentPage+1} />);
            pagesToDisplay.push(<PageNumber text='>>' page={lastPage} />);
        }

        return <div className='row margin_30_left margin_30_right margin_30_top margin_30_bottom width_auto flex_center'>
                  {pagesToDisplay}
               </div>
    },
});