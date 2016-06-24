function validObject(object){
  if(typeof object === 'undefined' || object == null ){
    return false;
  }
  return true;
}

//function to sanitize keypress code across browsers
function getKeyCode(e){
  // console.log('e.which', 'e.keyCode', e.keyCode, 'e.charCode', e.charCode);
  return e.keyCode || e.charCode;
}

module.exports ={
  validObject: validObject,
  getKeyCode: getKeyCode
}