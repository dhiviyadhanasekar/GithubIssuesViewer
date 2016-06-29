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
          background: background,
          width: dimensions,
          height: dimensions,
        }
        if(this.props.style){
          style = _.merge({}, style, this.props.style);
        }

        var klass = 'round_circle ';
        if(this.props.klass) klass += this.props.klass;


        return <div style={style} className={klass} ></div>;
    }
});