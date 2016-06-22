function validObject(object){
  if(typeof object === 'undefined' || object == null ){
    return false;
  }
  return true;
}

module.exports.validObject = validObject;