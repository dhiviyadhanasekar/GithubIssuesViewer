chai = require('chai');
expect = chai.expect;
assert = require("assert");
var mock = require('mock-require');
mock('src/app_constants/IssuesViewConstants', '../../src/app_constants/IssuesViewConstants'); 
mock('src/utils/utils', './../../src/utils/utils');
var MarkdownProcessor = require('./../../src/utils/markdown_processor');

describe('Markdown Processor Unit Test', function() {

 it('should truncate text to 140 chars ending on a word or line', function() {
    var text = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
    var truncatedText = MarkdownProcessor.truncatePreviewContent(text);
    var expectedText = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever...";
     expect(truncatedText).to.equal(expectedText);
 });

 it('should convert @name to github user url', function() {
      var text = '<p>@dhiviyadhanasekar </p>';
      var linkedText = MarkdownProcessor.createUserLinks(text);
      var expectedText = '<p><a href="https://github.com/dhiviyadhanasekar" class="pointer">@dhiviyadhanasekar</a> </p>';
      expect(linkedText).to.equal(expectedText);
 });

 it('should convert -[ ] to unchecked checkbox', function() {
      var text = '- [ ] ';
      var checkBoxText = MarkdownProcessor.createCheckboxes(text);
      var expectedText = '<input type="checkbox" class="not_clickable"> ';
      expect(checkBoxText).to.equal(expectedText);
 });

 it('should convert -[x] to unchecked checkbox', function() {
      var text = '- [x] ';
      var checkBoxText = MarkdownProcessor.createCheckboxes(text);
      var expectedText = '<input type="checkbox" checked="true" class="not_clickable"> ';
      expect(checkBoxText).to.equal(expectedText);
 });

 it('should convert -[X] to unchecked checkbox - x needs to be case insensitive', function() {
      var text = '- [X] ';
      var checkBoxText = MarkdownProcessor.createCheckboxes(text);
      var expectedText = '<input type="checkbox" checked="true" class="not_clickable"> ';
      expect(checkBoxText).to.equal(expectedText);
 });

 });