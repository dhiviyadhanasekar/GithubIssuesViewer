var Labels = module.exports = React.createClass({
  render: function(){
      var labelArray = [];
      var labels = this.props.issue.labels;
      var label = null;
      
      for(var i=0; i<labels.length; i++){
            var label = labels[i];
            var style = {
              paddingTop: 3,
              paddingBottom: 3,
              paddingRight: 7,
              paddingLeft: 7,
              marginRight: 5,
              background: '#' + label.color,
            }
            if(this.props.labelStyle){
              style=$.extend({}, style, this.props.labelStyle);
            }
            labelArray.push(
              <div key={this.props.issue.id + '_' + 'label' + i} style={style} className='white round '>
                {label.name}
              </div>
            );
      }

      var klass= this.props.klass ? this.props.klass : 'row verysmall';

      return <div className={klass} style={{paddingTop: 2}}>{labelArray}</div>;
  },
});