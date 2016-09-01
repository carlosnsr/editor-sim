var Editor = function() {
  var _text = ''
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
      var redone = _undone.pop()
      _history.push(redone)
      return redone
    }

    var undo = function() {
      var undone = _history.pop()
      _undone.push(undone)
      return undone
    }

    return {
      push: push,
      redo: redo,
      undo: undo
    }
  }()

  var add = function(text) {
    _text += text
    _commands.push('add', arguments)
  }

  var redo = function() {
    var operation = _commands.redo()
    if ( operation.called === 'replace' ) {
      var original = operation.args[0]
      var replacement = operation.args[1]
      _replace(original, replacement)
    } else {
      throw 'Redo: Unknown operation ' + operation.called
    }
  }

  var _replace = function(target, replacement) {
    _text = _text.replace(RegExp(target, 'g'), replacement)
  }

  var replace = function(target, replacement) {
    _replace(target, replacement)
    _commands.push('replace', arguments)
  }

  var toString = function() {
    return _text
  }

  var undo = function() {
    var operation = _commands.undo()
    if ( operation.called === 'add' ) {
      var fragment = operation.args[0]
      _text = _text.slice(0, -(fragment.length))
    } else if ( operation.called === 'replace' ) {
      var original = operation.args[0]
      var replacement = operation.args[1]
      _replace(replacement, original)
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
console.log(editor.toString())

editor.redo()
console.log(editor.toString())
