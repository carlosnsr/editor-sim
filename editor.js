var Editor = function() {
  var _text = function() {
    var _text = ''

    var add = function(text) {
      _text += text
    }

    var truncate = function(fragment) {
      _text = _text.slice(0, -(fragment.length))
    }

    var replace = function(target, replacement) {
      _text = _text.replace(RegExp(target, 'g'), replacement)
    }

    var toString = function() {
      return _text
    }

    return {
      add: add,
      replace: replace,
      toString: toString,
      truncate: truncate
    }
  }()

  var _commands = function() {
    var _history = []
    var _undone = []

    var push = function(called, args) {
      _undone = []  // a new operation invalidates the previous history of undo's
      _history.push(
        {
          called: called,
          args: args
        }
      )
    }

    var redo = function() {
      return _move_last_operation(_undone, _history)
    }

    var undo = function() {
      return _move_last_operation(_history, _undone)
    }

    var _move_last_operation = function(old_list, target_list) {
      var operation = old_list.pop()
      if (operation) {
        target_list.push(operation)
      }
      return operation
    }

    return {
      push: push,
      redo: redo,
      undo: undo
    }
  }()

  var add = function(text) {
    _text.add(text)
    _commands.push('add', arguments)
  }

  var redo = function() {
    var operation = _commands.redo()
    if ( !operation ) {
      return
    }

    if ( operation.called === 'add' ) {
      var fragment = operation.args[0]
      _text.add(fragment)
    } else if ( operation.called === 'replace' ) {
      var original = operation.args[0]
      var replacement = operation.args[1]
      _text.replace(original, replacement)
    } else {
      throw 'Redo: Unknown operation ' + operation.called
    }
  }

  var replace = function(target, replacement) {
    _text.replace(target, replacement)
    _commands.push('replace', arguments)
  }

  var toString = function() {
    return _text.toString()
  }

  var undo = function() {
    var operation = _commands.undo()
    if ( !operation ) {
      return
    }

    if ( operation.called === 'add' ) {
      var fragment = operation.args[0]
      _text.truncate(fragment)
    } else if ( operation.called === 'replace' ) {
      var original = operation.args[0]
      var replacement = operation.args[1]
      _text.replace(replacement, original)
    } else {
      throw 'Undo: Unknown operation: ' + operation.called
    }
  }

  return {
    add: add,
    redo: redo,
    replace: replace,
    toString: toString,
    undo: undo
  }
};

const editor = new Editor
editor.add('Hello')
console.log(editor.toString())

editor.add(' there')
console.log(editor.toString())

editor.add(' stranger')
console.log(editor.toString())

editor.undo()
console.log(editor.toString())

editor.add(' foo the foo-gical dragon')
console.log(editor.toString())
editor.replace('foo', 'bar')
console.log(editor.toString())

editor.undo()
console.log(editor.toString())

editor.redo()
console.log(editor.toString())

editor.undo()
console.log(editor.toString())

editor.redo()
editor.redo()
console.log(editor.toString())

editor.undo()
editor.undo()
editor.undo()
editor.undo()
editor.undo()
console.log(editor.toString())

editor.redo()
editor.redo()
editor.redo()
editor.redo()
console.log(editor.toString())
