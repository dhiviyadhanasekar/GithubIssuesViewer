var UserAvatar = module.exports = React.createClass({
    
    displayName: 'UserAvatar',

    propTypes: {
      user: React.PropTypes.object.isRequired
    },
    
    render: function(){

      var dimensions = this.props.dimensions ? this.props.dimensions : 30;
      var url = this.props.user.avatar_url ? this.props.user.avatar_url : '/public_images/no_avatar.svg';
      var background = "url(" + url + ")  repeat scroll 0% 0% / cover";
      var style = {
        border: '1px solid white',
        background: background,
        width: dimensions,
        height: dimensions,
        fontSize: 25,
      }

      return (
        <a className=' flex_center two column margin_10_left gray pointer no_underline' href={this.props.user.html_url}>
            <div style={style} className="round_circle white flex_center row" ></div>
            <div className='verysmall flex_center row' style={{paddingTop: 2}}>
              {this.props.user.login ? '@' + this.props.user.login : null}
            </div>
        </a>
      )
    }
});