var UserAvatar = module.exports = React.createClass({
    render: function(){

      var colors = {
        "a": "#1abc9c",
        "b": "#16a085",
        "c": "#f1c40f",
        "d": "#f39c12",
        "e": "#2ecc71",
        "f": "#27ae60",
        "g": "#c0392b",
        "h": "#d35400",
        "i": "#3498db",
        "j": "#2980b9",
        "k": "#e74c3c",
        "l": "#c0392b",
        "m": "#9b59b6",
        "n": "#8e44ad",
        "o": "#bdc3c7",
        "p": "#34495e",
        "q": "#2c3e50",
        "r": "#95a5a6",
        "s": "#7f8c8d",
        "t": "#ec87bf",
        "u": "#d870ad",
        "v": "#f69785",
        "w": "#9ba37e",
        "x": "#b49255",
        "y": "#b49255",
        "z": "#a94136",
        "default": "#16a085"
      }

      var dimensions = this.props.dimensions ? this.props.dimensions : 25;
      var background = this.props.avatar ? "url(" + this.props.avatar + ")  repeat scroll 0% 0% / cover" : colors['a'];
      var style = {
        border: this.props.border,
        background: background,
        width: dimensions,
        height: dimensions,
        fontSize: 25
      }

      return (
        <div style={this.props.inline? {top: '-15px'} : {}} className={this.props.inline ? 'inline_block relative margin_10_right' : 'relative'}>
                 <div style={style} className="round_circle white flex align_center_vertical justify_center">
                 </div>
                 <div class>Name</div>
        </div>
      )
    }
});