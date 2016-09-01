var CommandList = require('./commands.js')
var TextArea = require('./text_area.js')

var Editor = function() {
  var _text = new TextArea()
  var _commands = new CommandList()

  var add = function(text) {
    _text.add(text)
    _commands.push(
      function() {
        _text.add(text)
      },
      function() {
        _text.truncate(text)
      }
    )
  }

  var redo = function() {
    var operation = _commands.redo()
    operation.redo()
  }

  var replace = function(target, replacement) {
    _text.replace(target, replacement)
    _commands.push(
      function() {
        _text.replace(target, replacement)
      },
      function() {
        _text.replace(replacement, target)
      }
    )
  }

  var toString = function() {
    return _text.toString()
  }

  var undo = function() {
    var operation = _commands.undo()
    operation.undo()
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
