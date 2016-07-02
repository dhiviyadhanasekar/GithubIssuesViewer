var marked = require('marked');
marked.setOptions({ gfm: true, breaks: true, tables: true});
var IssuesViewConstants = require('src/app_constants/IssuesViewConstants');

var MarkdownProcessor = module.exports = {
  
   convertToHtml: function(content) {
    content = this.createUserLinks(content);
    content = this.createCheckboxes(content);
    content = marked(content);
    return content;
  },

  createCheckboxes: function(content){

      var checkbox = '$1<input type="checkbox"></input>$3';
      content = content.replace(/(^|\s|)(- \[ \])(\s)/g, checkbox);

      var checkedCheckbox = '$1<input type="checkbox" checked="true">$3';
      content = content.replace(/(^|\s|)(- \[x\])(\s)/g, checkedCheckbox);
      return content;
  },

  createUserLinks: function(content) {

    var userLink = '$1<a href="https://github.com/$2" class="pointer">@$2</a>';
    return content.replace(/(^|\s|>)@([a-zA-Z_-]{2,})/g, userLink);
  },

  getHtmlPreviewContent: function(content) {

    content = this.truncatePreviewContent(content);
    if(content.length === 0) content = '<i>No text available...</i>';
    return this.convertToHtml(content);
  },

  truncatePreviewContent: function(content) {

    if (content.length <= IssuesViewConstants.MAX_PREVIEW_LENGTH) return content;

    var spaceRegex = /\s/;
    var match;

    var end = 0, prevEnd = 0;
    // var tempContent = content;
    do{

      match = content.slice(end).match(spaceRegex);
      if (!validObject(match) || match.length <= 0) {
        return content.slice(0, IssuesViewConstants.MAX_PREVIEW_LENGTH).trim() + '...';//trimming to make the text look nice in the preview
      }
      prevEnd = end;
      end += match.index + 1;
      // tempContent = content.slice(0, prevEnd).trim();

    }while(end <= IssuesViewConstants.MAX_PREVIEW_LENGTH && end <= content.length);
   
    // console.debug('here...');
    return content.slice(0, prevEnd).trim() + '...'; //trimming to make the text look nice in the preview
  }
}

