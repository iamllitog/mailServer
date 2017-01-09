module.exports = function(message) {
  this.name = 'tokenInvalid';
  this.message = message || 'token invalid';
  this.stack = (new Error()).stack;
}