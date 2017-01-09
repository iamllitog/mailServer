module.exports = function(message) {
  this.name = 'paramRequired';
  this.message = message || 'no param';
  this.stack = (new Error()).stack;
}