var CommandList = function() {
  var _history = []
  var _undone = []

  var push = function(redo_fn, undo_fn) {
    _undone = []  // a new operation invalidates the previous history of undo's
    _history.push( _make_command(redo_fn, undo_fn) )
  }

  var _make_command = function(redo_fn, undo_fn) {
    return {
      redo: redo_fn,
      undo: undo_fn
    }
  }

  var redo = function() {
    return _move_last_operation(_undone, _history)
  }

  var undo = function() {
    return _move_last_operation(_history, _undone)
  }

  const NULL_OBJECT = _make_command(function() {}, function() {})
  var _move_last_operation = function(old_list, target_list) {
    var operation = old_list.pop() || NULL_OBJECT
    if ( !(operation === NULL_OBJECT) ) {
      target_list.push(operation)
    }
    return operation
  }

  return {
    push: push,
    redo: redo,
    undo: undo
  }
}

module.exports = CommandList
