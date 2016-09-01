var Editor = function() {
  var _text = ''
  var _commands = function() {
    var _history = []

    var push = function(called, args) {
      _history.push(
        {
          called: called,
          args: args
        }
      )
    }

    var undo = function() {
      return _history.pop()
    }

    return {
      push: push,
      undo: undo
    }
  }()

  var add = function(text) {
    _text += text
    _commands.push('add', arguments)
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
    }
  }

  return {
    add: add,
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
