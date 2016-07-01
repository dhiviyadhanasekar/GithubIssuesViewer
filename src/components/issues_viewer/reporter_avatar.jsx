var UserAvatar = require('components/lib/user_avatar');
var ReporterAvatar = module.exports = React.createClass({
    
    displayName: 'ReporterAvatar',

    propTypes: {
      user: React.PropTypes.object.isRequired,
      displayUserName: React.PropTypes.bool,
      dimensions: React.PropTypes.number,
    },
    
    render: function(){

      var userNameStyle ={
          width: '100%',
          maxWidth: 80
      }

      var userName = null;
      if(this.props.displayUserName !== false)
        userName = <div className='verysmall row margin_auto_left ' style={{paddingTop: 2}}>
                        <div className='ellipsis block margin_10_right' style={userNameStyle}>
                            {this.props.user.login ? '@' + this.props.user.login : null}
                        </div>
                    </div>;    

      return (
        <a className='flex_center column margin_10_left gray pointer no_underline auto_width' href={this.props.user.html_url}>
            <UserAvatar user={this.props.user} klass={'row margin_auto_left margin_20_right z1'} dimensions={this.props.dimensions}/>
            {userName}
        </a>
      )
    }
});