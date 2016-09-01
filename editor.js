var Editor = function() {
  var _fragments = []

  var add = function(fragment) {
    _fragments.push(fragment)
  }

  var replace = function(target, replacement) {
    _fragments.forEach( function(fragment, index, fragments) {
      _fragments[index] = fragment.replace(RegExp(target, 'g'), replacement)
    })
  }

  var toString = function() {
    return _fragments.join('')
  }

  var undo = function() {
    _fragments.pop()
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
