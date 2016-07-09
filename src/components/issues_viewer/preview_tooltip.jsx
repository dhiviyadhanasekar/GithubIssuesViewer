var PreviewTooltip = module.exports = React.createClass({

    displayName: 'PreviewTooltip',

    propTypes: {
      content: React.PropTypes.any,
    },
    componentDidMount: function(){

    },
    render: function(){
        
        var tooltipDivStyle ={
              zIndex: 9999,
        }
        var tooltipStyle = {
              width: 370,
              transform: "translate(19%, -63%)",
              paddingLeft: 10,
              paddingRight: 10,
              paddingTop: 2,
              paddingBottom: 2,
        };

        var tooltipClassName = "absolute padding_10 round small white_background z2 auto_height";
        var triangleStyle = {
            fontSize: 25,
            textShadow: '0 0 20px black',
            transform: 'translate(213%, -85%)',
          }        

        return (
          <div className='absolute testId_preview' style={tooltipDivStyle}>
            <div className='absolute white ' style={triangleStyle}>◀</div>
            <div className={tooltipClassName} style={tooltipStyle}>
              {this.props.content}
            </div>
          </div>
        )
    }
});
