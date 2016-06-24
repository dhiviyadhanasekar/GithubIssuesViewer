getKeyCode = require('src/utils/utils').getKeyCode;

var ContentEditableDiv = module.exports = React.createClass({

  displayName: 'ContentEditableDiv',

  propTypes: {
    placeholder: React.PropTypes.string,
    class: React.PropTypes.string,
    isEditableByUser: React.PropTypes.bool,
    id: React.PropTypes.any,
    onKeyDown: React.PropTypes.func,
    handleKeyPress: React.PropTypes.func,
    onMouseDown: React.PropTypes.func,
    onBlur: React.PropTypes.func,
    style: React.PropTypes.object,
    text: React.PropTypes.string
  },

  handleKeyPress: function(e){

    e.stopPropagation();
    if(getKeyCode(e) == 13) {
      e.preventDefault();
      e.target.blur();
      if(this.props.onEnterKey) this.props.onEnterKey(e);
    }
  },

  onBlur: function(e){

      e.stopPropagation();
      // console.log('blurring called from content_editable div react');
      if(this.props.onBlur) {
        // console.log('e', e);
        var el = $(e.target);
        var text = $.trim(el.text());
        el.text(text); //just to keep it in sync
        this.props.onBlur(text, e);
      }
  },
  
  onKeyDown: function(e){
    if(this.props.onKeyDown) this.props.onKeyDown(e);
  },

  render: function(){
      // console.log('render content content_editable', this.props.text.length);
      var klass = this.props.class + " content_editable";
      var placeholder = this.props.placeholder ? this.props.placeholder : "Type here";
      var isEditableByUser = true;
      if (validObject(this.props.isEditableByUser) && this.props.isEditableByUser == false) {
        isEditableByUser = false;
      }

      return (
        <div contentEditable={isEditableByUser} 
              placeholder={placeholder} 
              className={klass} 
              id={this.props.id} 
              onKeyDown={this.props.onKeyDown}
              onKeyPress = {this.handleKeyPress} 
              onMouseDown={this.props.onMouseDown}
              onBlur={this.onBlur} 
              style={this.props.style} >
          {this.props.text}
        </div>
      )
  }
});