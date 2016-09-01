var Editor = function() {
  var _fragments = []

  var add = function(fragment) {
    _fragments.push(fragment)
  }

  var toString = function() {
    return _fragments.join('')
  }

  var undo = function() {
    _fragments.pop()
  }

  return {
    add: add,
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
