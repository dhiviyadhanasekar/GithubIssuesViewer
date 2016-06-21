var EventEmitter = require('events').EventEmitter;
EventEmitter.prototype._maxListeners = 0;
// console.log('EventEmitter.prototype._maxListeners', EventEmitter.prototype._maxListeners);

var BaseStore = module.exports = Object.assign({}, EventEmitter.prototype, {

  emitChange: function(event) {
    this.emit(event);
  },

  addChangeListener: function(event, callback) {
    this.on(event, callback);
  },

  removeChangeListener: function(event, callback) {
    this.removeListener(event, callback);
  }

});

