module.exports = function(message) {
  this.name = 'permissionDenied';
  this.message = message || 'permission denied';
  this.stack = (new Error()).stack;
}